import { renderers } from '../utils/utils';

export interface DetectionEntry {
  key: string;
  check: (value: string) => boolean;
  /** Whether this renderer participates in auto-detection when no explicit renderer list is given. */
  autoDiscoverableByDefault: boolean;
}

/**
 * Builds the detection registry by instantiating each renderer and calling its quickCheck method.
 * The registry is sorted by priority, with lower numbers indicating higher priority. Renderers without a defined
 * priority are treated as having a default priority of 99, so they will come after any renderers with an explicit priority.
 * The 'FallbackType' renderer is excluded from the registry since it is meant to be a last-resort option when no other renderer matches.
 * The registry is built lazily on first access to avoid unnecessary instantiation of renderers if detection is never used.
 */
function buildDetectionRegistry(): DetectionEntry[] {
  const priorities = new Map<string, number>();

  return renderers
    .filter(r => r.key !== 'FallbackType')
    .map(renderer => {
      priorities.set(renderer.key, renderer.priority ?? 99); // Default priority is 99 if not specified, so any renderer with a defined priority will come before those without.

      return {
        key: renderer.key,
        autoDiscoverableByDefault: renderer.autoDiscoverableByDefault,
        check: (value: string) => {
          const instance = new renderer.constructor(value);
          return instance.quickCheck();
        },
      } as DetectionEntry; // Type assertion to ensure the object conforms to DetectionEntry
    })
    .sort((a, b) => (priorities.get(a.key) ?? 99) - (priorities.get(b.key) ?? 99));
}

let _detectionRegistry: DetectionEntry[] | undefined;

/**
 * Get the detection registry, building it on first access if it hasn't been built yet.
 * This ensures that renderers are only instantiated when detection is actually used, improving performance for cases where detection is not needed.
 * The registry is cached after the first build to avoid redundant work on subsequent accesses.
 *
 * @returns An array of DetectionEntry objects representing the detection registry.
 */
function getDetectionRegistry(): DetectionEntry[] {
  if (!_detectionRegistry) {
    _detectionRegistry = buildDetectionRegistry();
  }
  return _detectionRegistry;
}

// Initializing the detection registry by calling getDetectionRegistry() to build and cache it, then populating the exported detectionRegistry array with its contents.
export const detectionRegistry: DetectionEntry[] = [];
getDetectionRegistry().forEach(entry => detectionRegistry.push(entry));

/**
 * Characters to strip from the leading edge of a token during auto-detection.
 * These are common surrounding punctuation that may be adjacent to a PID in
 * running text (e.g., `"10.5281/foo"`, `(0009-0005-2800-4833)`, `DOI:10.5281/foo`).
 */
const LEADING_STRIP = /^[\s.,;:!?\-–—"'`´«»()[\]{}<>*/\\#@^~|]+/;

/**
 * Characters to strip from the trailing edge of a token during auto-detection.
 */
const TRAILING_STRIP = /[\s.,;:!?\-–—"'`´«»()[\]{}<>*/\\#@^~|]+$/;

/**
 * Sanitize a token by stripping common leading/trailing punctuation.
 * Returns the sanitized value and the character offsets stripped from each side,
 * so the caller can adjust match positions to point at only the cleaned portion.
 *
 * @param token The raw token from the text
 * @returns { sanitized, leadingStripped } where leadingStripped is the number
 *          of characters removed from the front.
 */
export function sanitizeToken(token: string): { sanitized: string; leadingStripped: number } {
  const leadingMatch = LEADING_STRIP.exec(token);
  const leadingStripped = leadingMatch ? leadingMatch[0].length : 0;
  let sanitized = token.substring(leadingStripped);

  const trailingMatch = TRAILING_STRIP.exec(sanitized);
  if (trailingMatch) {
    sanitized = sanitized.substring(0, sanitized.length - trailingMatch[0].length);
  }

  return { sanitized, leadingStripped };
}

/**
 * Find the best-fit renderer key for a value using the detection registry.
 *
 * @param value The string to check
 * @param orderedRendererKeys Optional ordered list of renderer keys to try.
 *        If set, only these renderers are checked, in this order. First match wins.
 *        If not set, only renderers with `autoDiscoverableByDefault: true` are tried.
 * @param fallbackToAll When orderedRendererKeys is set but no listed renderer matches,
 *        falls back to the full default registry if true (default: true).
 * @returns The renderer key of the best-fit, or null if nothing matches.
 */
export function detectBestFit(
  value: string,
  orderedRendererKeys?: string[],
  fallbackToAll: boolean = true,
): string | null {
  const registry = getDetectionRegistry();
  if (orderedRendererKeys && orderedRendererKeys.length > 0) {
    for (const key of orderedRendererKeys) {
      const entry = registry.find(e => e.key === key);
      if (entry && entry.check(value)) {
        return entry.key; // First match wins
      }
    }
    if (!fallbackToAll) { // If fallbackToAll is false, return null if no match is found
      return null;
    }
  }

  // No explicit list (or fallback mode): only try renderers that are auto-discoverable by default
  for (const entry of registry) {
    if (entry.autoDiscoverableByDefault && entry.check(value)) {
      return entry.key;
    }
  }
  return null; // No match found
}
