import { ActivityLog } from "../models/activityLog.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


//Get all activity
export const getActivity = asyncHandler(async (req, res) => {
    const activity = await ActivityLog.find({ user: req.user._id })
        .sort({ createdAt: -1 })
        .limit(10)
        .populate("relatedPost", "content");

    return res.status(200).json(
        new ApiResponse(200, activity, "Activity logs fetched successfully")
    );
});

