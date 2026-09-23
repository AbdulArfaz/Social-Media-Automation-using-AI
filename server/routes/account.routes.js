import express from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { addAccount, disconnectAccount, getAccounts } from '../controllers/account.controller.js'

const accountRouter = express.Router()

accountRouter.get('/', verifyJWT, getAccounts);
accountRouter.post('/', verifyJWT, addAccount);
accountRouter.delete('/:id', verifyJWT, disconnectAccount);

export default accountRouter;