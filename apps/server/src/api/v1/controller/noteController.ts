import { prisma } from "@repo/db/client";
import { Request, Response } from "express";

const createNoteController = async (req: Request, res: Response) => {
    const { title, description, tags } = req.body;
    try {
        // Create a new note
        const note = await prisma.note.create({
            data: {
                title,
                description,
                TagsOnNotes: tags,
                ownerId: req.userId as number
            }
        });

        res.json({
            message: "Note created successfully!",
            note
        });

        return;
    } catch (e) {
        console.error(e);
        res.status(400).json({
            error: "Error creating note"
        });
        return;
    }
}

const getNoteController = async (req: Request, res: Response) => {
    const noteId = Number(req.params);
    try {
        const note = await prisma.note.findUnique({
            where: {
                id: noteId
            }
        })
        res.json({
            note
        })
        return
    } catch (e) {
        console.error(e);
        res.status(400).json({
            error: "Error retrieving note details"
        })
        return
    }
}

const getNoteListController = async (req: Request, res: Response) => {
    const userId = Number(req.userId);
    try {
        const notes = await prisma.note.findMany({
            where: {
                ownerId: userId
            }
        })
        res.json({
            notes
        })
        return
    } catch (e) {
        console.error(e);
        res.status(400).json({
            error: "Error loading notes!"
        })
        return
    }
}

const updateNoteController = async (req: Request, res: Response) => {
    const body = req.body;
    const noteId = Number(req.params)
    try {
        const updatedNote = await prisma.note.update({
            where: {
                id: noteId
            },
            data: body
        })

        res.json({
            updatedNote
        });
        return
    } catch (e) {
        console.error(e);
        res.status(400).json({
            error: "Error updating the note"
        })
        return
    }
}

const deleteNoteController = async (req: Request, res: Response) => {
    const noteId = Number(req.params);
    try {
        const note = prisma.note.delete({
            where: {
                id: noteId
            }
        })

        res.json({
            message: "Note deleted correctly!"
        })
        return
    } catch (e) {
        console.error(e);
        res.status(400).json({
            message: "Error deleting the note"
        })
        return
    }
}

const assignTagController = (req: Request, res: Response) => {

    try {

    } catch (e) {

    }
}

const removeTagController = (req: Request, res: Response) => {
    try {

    } catch (e) {

    }
}

export {
    createNoteController,
    getNoteController,
    getNoteListController,
    updateNoteController,
    deleteNoteController,
    assignTagController,
    removeTagController
}