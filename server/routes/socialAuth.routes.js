import express from 'express'
import { generateAuthUrl, syncAccounts } from '../controllers/socialAuth.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const socialAuthRouter = express.Router()

socialAuthRouter.get('/:platform/url',verifyJWT, generateAuthUrl)
socialAuthRouter.get('/sync',verifyJWT, syncAccounts)


export default socialAuthRouter;
