import { Router } from "express";
import { createTagController, getTagController, getTagListController } from "../controller/tagController";
import { checkAuth, hasTagAccess } from "../middleware";

const tagRouter = Router();

tagRouter.post("/create", checkAuth, createTagController);
tagRouter.get("/:id", checkAuth, hasTagAccess, getTagController);
tagRouter.get("/list", checkAuth, getTagListController);

export { tagRouter }