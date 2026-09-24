import { Accounts } from '../models/account.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import zernio from '@zernio/node';

// get all accounts
export const getAccounts = asyncHandler(async (req, res) => {
    const accounts = await Accounts.find({ user: req.user._id });

    return res.status(200).json(
        new ApiResponse(200, accounts, "Accounts fetched successfully")
    );
});

// add account
export const addAccount = asyncHandler(async (req, res) => {
    const { platform, handle, avatarUrl } = req.body;

    const account = await Accounts.create({
        user: req.user._id,
        platform,
        handle,
        avatarUrl
    });

    if (!account) {
        throw new ApiError(500, "Failed to create account");
    }

    return res.status(201).json(
        new ApiResponse(201, account, "Account added successfully")
    );
});

//disconnect account

export const disconnectAccount = asyncHandler(async (req, res) => {
    const account = await Accounts.findOne({ _id: req.params.id, user: req.user._id });

    if (!account) {
        throw new ApiError(404, 'Account not found');
    }
     try {
        if(account.zernioAccountId && typeof zernio?.connect?.delete === 'function'){
            await zernio.connect.delete({path: {accountId: account.zernioAccountId}})
        }
     } catch (sdkError) {
           console.warn('External SDK deletion skipped or failed:', sdkError.message)
     }

    await account.deleteOne();

    return res.status(200).json(
        new ApiResponse(200, {}, "Account disconnected successfully")
    );
});

