/**
 * Detección de bots/crawlers de IA y persistencia de conteos en Vercel KV.
 *
 * El middleware de Astro inspecciona el User-Agent y Referer de cada request,
 * identifica si proviene de un modelo de IA conocido (GPTBot, ClaudeBot, etc.)
 * e incrementa un contador atómico en Vercel KV.
 *
 * El endpoint /api/ai-stats (protegido por API key) devuelve el ranking.
 *
 * Documentación de Vercel KV: https://vercel.com/docs/storage/vercel-kv
 */
import { kv } from '@vercel/kv';
import aiModels from '@/shared/constants/ai-models.json';

export interface AiModel {
  id: string;
  name: string;
  vendor: string;
  patterns: {
    userAgents: string[];
    referrers: string[];
  };
}

interface DetectionResult {
  model: AiModel;
  matchedBy: 'userAgent' | 'referer';
}

const MODELS = aiModels.models as AiModel[];

/**
 * Identifica el modelo de IA a partir del User-Agent y Referer.
 * Prioriza la coincidencia por User-Agent; si no, busca por Referer.
 */
export function detectAiBot(
  userAgent: string,
  referer: string,
): DetectionResult | null {
  const ua = userAgent.toLowerCase();

  for (const model of MODELS) {
    // Coincidencia por User-Agent (case-insensitive).
    if (
      model.patterns.userAgents.some((pattern) =>
        ua.includes(pattern.toLowerCase()),
      )
    ) {
      return { model, matchedBy: 'userAgent' };
    }
  }

  // Si no se encontró por UA, buscar por Referer.
  if (referer) {
    const ref = referer.toLowerCase();
    for (const model of MODELS) {
      if (
        model.patterns.referrers.some((pattern) => ref.includes(pattern.toLowerCase()))
      ) {
        return { model, matchedBy: 'referer' };
      }
    }
  }

  return null;
}

/** Clave base para los contadores en KV. */
const KV_KEY_PREFIX = 'ai-stats';

/** Incrementa en 1 el contador del modelo detectado. No lanza errores. */
export async function trackAiBotVisit(modelId: string): Promise<void> {
  try {
    await kv.hincrby(KV_KEY_PREFIX, modelId, 1);
  } catch {
    // Silencioso: si KV no está configurado (p. ej. en dev local sin env),
    // el tracking falla pero el sitio funciona con normalidad.
  }
}

/** Devuelve el ranking completo de modelos con sus conteos, ordenado desc. */
export async function getAiStats(): Promise<
  { id: string; name: string; vendor: string; count: number }[]
> {
  let raw: Record<string, number> = {};

  try {
    const data = await kv.hgetall<Record<string, number>>(KV_KEY_PREFIX);
    if (data) raw = data;
  } catch {
    // Si KV no está disponible, devolver todos los modelos con count: 0.
  }

  return MODELS.map((model) => ({
    id: model.id,
    name: model.name,
    vendor: model.vendor,
    count: raw[model.id] ?? 0,
  }))
    .filter((entry) => entry.count > 0)
    .sort((a, b) => b.count - a.count);
}
