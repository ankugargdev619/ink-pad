import { Router } from "express";
import { checkAuth, hasNoteAccess } from "../middleware.js";
import { assignTagController, createNoteController, deleteNoteController, getNoteController, getNoteListController, removeTagController, updateNoteController } from "../controller/noteController.js";

const noteRouter = Router();

noteRouter.post("/create", checkAuth, createNoteController);
noteRouter.get("/:id", checkAuth, hasNoteAccess, getNoteController);
noteRouter.get("/list", checkAuth, getNoteListController);
noteRouter.post("/:id", checkAuth, hasNoteAccess, updateNoteController);
noteRouter.delete("/:id", checkAuth, hasNoteAccess, deleteNoteController);
noteRouter.post("/:id/tags", checkAuth, hasNoteAccess, assignTagController);
noteRouter.delete("/:id/tags/:tagId", checkAuth, hasNoteAccess, removeTagController);

export default noteRouter;