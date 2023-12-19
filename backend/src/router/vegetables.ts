import { Router } from "express";
import {
  routTest,
  getVegList,
  addVegItem,
  updateVegItem,
  deleteVegItem,
  getByIdVegItem,
} from "../controller/vegController";
import { checkIsAdmin } from "../middleware/auth";

const router: Router = Router();

router.get("/", routTest);
router.get("/vegetables", checkIsAdmin, getVegList);
router.post("/vegetables", checkIsAdmin, addVegItem);
router.patch("/vegetables/:id", checkIsAdmin, updateVegItem);
router.delete("/vegetables/:id", checkIsAdmin, deleteVegItem);
router.get("/vegetables/:id", checkIsAdmin, getByIdVegItem);

export const vegetables = router;
