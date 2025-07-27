import { Router } from "express";
import historyController from "../../controllers/history/historyController";

const router = Router();

router.get("/", historyController.getHistory);

export default router;
