import express from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { getActivity } from '../controllers/activity.controller.js'

const activityRouter = express.Router()

activityRouter.get('/', verifyJWT, getActivity);


export default activityRouter;