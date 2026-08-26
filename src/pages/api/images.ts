/**
 * Endpoint de subida de imágenes: lo llama mitumbes-server cuando el agente
 * adjunta una imagen (data URL o URL remota) a un lugar/evento. El servidor
 * envía los bytes ya convertidos a WebP y la web los almacena en
 * `public/images/`, devolviendo la URL resultante (`/images/<archivo>.webp`)
 * que mitumbes-server usa como `imageUrl` en el contenido (markdown).
 *
 * Autenticación: header `Authorization: Bearer <CONTENT_REVALIDATE_KEY>`.
 * Si la variable no está configurada, se rechaza la petición.
 */
import type { APIRoute } from 'astro';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export const prerender = false;

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export const POST: APIRoute = async ({ request }) => {
  const expectedKey = import.meta.env.CONTENT_REVALIDATE_KEY;

  if (!expectedKey) {
    return new Response(JSON.stringify({ error: 'CONTENT_REVALIDATE_KEY no configurada' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const authHeader = request.headers.get('authorization') ?? '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';

  if (token !== expectedKey) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const buffer = Buffer.from(await request.arrayBuffer());
  if (!buffer.length) {
    return new Response(JSON.stringify({ error: 'Cuerpo vacío' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (buffer.length > MAX_BYTES) {
    return new Response(JSON.stringify({ error: 'Imagen demasiado grande (máx 10 MB)' }), {
      status: 413,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const dir = join(process.cwd(), 'public', 'images');
  await mkdir(dir, { recursive: true });
  const name = `upload-${Date.now()}-${Math.random().toString(36).slice(2, 10)}.webp`;
  await writeFile(join(dir, name), buffer);

  return new Response(JSON.stringify({ ok: true, url: `/images/${name}` }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
};
