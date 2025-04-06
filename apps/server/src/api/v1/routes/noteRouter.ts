import { Router } from "express";
import { checkAuth, hasNoteAccess, validateSchema } from "../middleware.js";
import { assignTagController, createNoteController, deleteNoteController, getNoteController, getNoteListController, removeTagController, updateNoteController } from "../controller/noteController.js";
import { createNoteSchema, updateNoteSchema } from "../validators/noteValidator.js";

const noteRouter: Router = Router();

noteRouter.post("/create", checkAuth, validateSchema(createNoteSchema), createNoteController);
noteRouter.get("/:id", checkAuth, hasNoteAccess, getNoteController);
noteRouter.get("/list", checkAuth, getNoteListController);
noteRouter.post("/:id", checkAuth, validateSchema(updateNoteSchema), hasNoteAccess, updateNoteController);
noteRouter.delete("/:id", checkAuth, hasNoteAccess, deleteNoteController);
noteRouter.post("/:id/tags", checkAuth, hasNoteAccess, assignTagController);
noteRouter.delete("/:id/tags/:tagId", checkAuth, hasNoteAccess, removeTagController);

export default noteRouter;