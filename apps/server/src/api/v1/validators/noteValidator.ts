import { z } from "zod";


const createNoteSchema = z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string())
})

