import { defineCollection, reference, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
const LOCALES = ['es', 'en', 'pt'] as const;
/** Helper para campos localizados: `title: { es, en, pt }`. */
const loc = <T extends z.ZodType>(type: T) => z.record(z.enum(LOCALES), type);

const placeSchema = ({ image }: SchemaContext) =>
  z.object({
  title: loc(z.string()),
  description: loc(z.string()),
  excerpt: loc(z.string()).optional(),
  /** Solo presente en el index.md de cada colección (metadata de categoría). */
  icon: z.string().optional(),
  /** Solo presente en contenidos reales; el index.md no tiene zona. */
  zone: reference('zones').optional(),
  /** Imagen local (ruta relativa al archivo, se procesa con astro:assets) o URL remota. */
  image: z.union([image(), z.string()]).optional(),
  gallery: z.array(z.string()).optional(),
  coordinates: z
    .object({ lat: z.number(), lng: z.number() })
    .optional(),
  address: loc(z.string()).optional(),
  hours: loc(z.string()).optional(),
  price: loc(z.string()).optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  website: z.string().optional(),
  social: z
    .object({
      instagram: z.string().optional(),
      facebook: z.string().optional(),
    })
    .optional(),
  services: loc(z.array(z.string())).optional(),
  howToGet: loc(z.string()).optional(),
  activities: loc(z.array(z.string())).optional(),
  nearby: z.array(z.string()).optional(),
  source: loc(z.string()).optional(),
  verified: z.boolean().default(false),
  featured: z.boolean().default(false),
  rating: z.number().min(0).max(5).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  body: loc(z.string()).optional(),
});

const zonaSchema = ({ image }: SchemaContext) =>
  z.object({
  title: loc(z.string()),
  /** Solo presente en zonas reales; el index.md de zones no lo tiene. */
  type: z.enum(['ciudad', 'playa', 'zona', 'distrito']).optional(),
  description: loc(z.string()),
  /** Imagen local (ruta relativa al archivo, se procesa con astro:assets) o URL remota. */
  image: z.union([image(), z.string()]).optional(),
  icon: z.string().optional(),
  body: loc(z.string()).optional(),
});

const coleccion = (base: string) =>
  defineCollection({ loader: glob({ pattern: '**/*.md', base }), schema: placeSchema });

export const collections = {
  places: coleccion('./src/content/places'),
  restaurants: coleccion('./src/content/restaurants'),
  hotels: coleccion('./src/content/hotels'),
  activities: coleccion('./src/content/activities'),
  events: coleccion('./src/content/events'),
  services: coleccion('./src/content/services'),
  zones: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/zones' }),
    schema: zonaSchema,
  }),
};
