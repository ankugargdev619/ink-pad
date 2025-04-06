import { z } from "zod";

const VALIDATIONS = {
    validTitle: z.string({
        required_error: "This is a required field",
        invalid_type_error: "Must be a string"
    }).min(1, "Must have atleast 2 characters"),
    validDescription: z.string({
        required_error: "This is required field",
        invalid_type_error: "Must be a string"
    }),
    tagList: z.array(z.string()),
    tagId: z.number()
}

const createNoteSchema = z.object({
    title: VALIDATIONS.validTitle,
    description: VALIDATIONS.validDescription,
    tags: VALIDATIONS.tagList
}).strict();

const updateNoteSchema = z.object({
    title: VALIDATIONS.validTitle.optional(),
    description: VALIDATIONS.validDescription.optional(),
    isArchived: z.boolean().optional()
})

export {
    createNoteSchema,
    updateNoteSchema
}