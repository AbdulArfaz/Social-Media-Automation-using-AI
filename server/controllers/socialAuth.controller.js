import zernio from "../db/zernio.js";
import { User } from "../models/user.model.js";
import { Accounts } from "../models/account.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//helper to ensure user has zernio profile
export const getOrCreateZernioProfile = async (user) => {
    // 1. Return cached profile ID if it already exists on the user document
    if (user.zernioProfileId) {
        return user.zernioProfileId;
    }

    // 2. Check if a profile already exists in Zernio
    const result = await zernio.profiles.listProfiles();
    const data = result.data;
    const profiles = Array.isArray(data) ? data : data?.profiles || data?.data || [];

    if (profiles.length > 0) {
        const pid = profiles[0]._id || profiles[0].id;
        await User.findByIdAndUpdate(user._id, { zernioProfileId: pid });
        return pid; // Returns the clean string ID directly
    }

    // 3. Otherwise, create a new profile in Zernio
    const createResult = await zernio.profiles.createProfile({
        body: { name: `${user.name || user.email}'s workspace` },
    });
    
    const created = createResult.data?.profile || createResult.data;
    const pid = created?._id || created?.id;

    if (!pid) {
        throw new ApiError(500, "Failed to create new Zernio profile - no ID returned");
    }

    // Save the new profile ID to the user document and return it
    await User.findByIdAndUpdate(user._id, { zernioProfileId: pid });
    return pid;
};

//generate OAuth authorization URL

export const generateAuthUrl = asyncHandler(async (req, res) => {
  const { platform } = req.params;
  const profileId = await getOrCreateZernioProfile(req.user);

  const origin = req.headers.origin;
  const redirectUrl = `${origin}/accounts`;
  const result = await zernio.connect.getConnectUrl({
    path: { platform },
    query: {
      profileId,
      redirect_url: redirectUrl,
    },
  });
  const data = result.data;
  console.log("getConnectUrl response:", JSON.stringify(data, null, 2));
  const authUrl = data.authUrl;

  if (!authUrl) {
    throw new ApiError(
      500,
      `Zernio returned no authUrl. Full response: ${JSON.stringify(data)}`
    );
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, { url: authUrl }, "Auth URL generated successfully")
    );
});


//sync connected accounts from zernio into MongoDB

export const syncAccounts = asyncHandler(async (req, res) => {
    const profileId = await getOrCreateZernioProfile(req.user);

    const result = await zernio.accounts.listAccounts({
        query: { profileId }
    });

    const data = result.data;
    const zernioAccounts = data?.accounts || (Array.isArray(data) ? data : []);

    const supportedPlatforms = [
        "twitter",
        "linkedin",
        "facebook",
        "instagram"
    ];

    const syncedAccounts = [];

    for (const zAccount of zernioAccounts) {
        const zid = zAccount._id || zAccount.id;

        if (!zid) {
            console.warn("Skipping account with no ID:", zAccount);
            continue;
        }

        const rawPlatform = (zAccount.platform || zAccount.type || "").toLowerCase();
        const normalizedPlatform = supportedPlatforms.find((p) => rawPlatform.includes(p));

        if (!normalizedPlatform) {
            console.log(`Skipping unsupported platform: "${rawPlatform}"`);
            continue;
        }

        const account = await Accounts.findOneAndUpdate(
            { zernioAccountId: zid },
            {
                user: req.user._id,
                platform: normalizedPlatform,
                handle: zAccount.username || zAccount.name || zAccount.handle || 'Unknown',
                zernioAccountId: zid,
                status: 'connected',
                avatarUrl: zAccount.avatarUrl || zAccount.picture || zAccount.profile_image_url,
            },
            { upsert: true, returnDocument: 'after' }
        );

        syncedAccounts.push(account);
    }

    return res.status(200).json(
        new ApiResponse(200, syncedAccounts, "Accounts synced successfully")
    );
});
