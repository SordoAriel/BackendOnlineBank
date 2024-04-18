import { Router } from "express";
import { getAll, newTransfer } from '@services/transfersServices'

const router = Router();

router.get('/', getAll)

router.post('/newTransfer', newTransfer)

export default router