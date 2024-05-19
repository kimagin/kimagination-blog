import { defineCollection, z } from 'astro:content'

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date().transform((val) => new Date(val).toISOString()),
    tags: z.array(z.string()),
  }),
})

export const collections = { blog: blogCollection }
