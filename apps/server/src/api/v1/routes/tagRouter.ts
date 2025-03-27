import { Router } from "express";
import { createTagController, getTagController, getTagListController } from "../controller/tagController.js";
import { checkAuth, hasTagAccess } from "../middleware.js";

const tagRouter : Router = Router();

tagRouter.post("/create", checkAuth, createTagController);
tagRouter.get("/:id", checkAuth, hasTagAccess, getTagController);
tagRouter.get("/list", checkAuth, getTagListController);

export default tagRouter;