import catalog from './localeText.json';
import type { LanguageCode } from './i18n';

const translations = catalog as Record<string, Record<string, string>>;

/** Static translations: changing language never waits on a translation service. */
export function localizeText(text: string, language: LanguageCode): string {
  const translated = language === 'en' ? text : translations[language]?.[text] ?? text;
  return translated.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
}

export function localizeContent<T>(value: T, language: LanguageCode): T {
  if (typeof value === 'string') return localizeText(value, language) as T;
  if (Array.isArray(value)) return value.map(item => localizeContent(item, language)) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localizeContent(item, language)])) as T;
  }
  return value;
}
