import 'server-only';
import type enDictionary from '../dictionaries/en.json';

export type Dictionary = typeof enDictionary;

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  'en': () => import('../dictionaries/en.json').then((module) => module.default),
  'pt-br': () => import('../dictionaries/pt-br.json').then((module): Dictionary => module.default),
  'es': () => import('../dictionaries/es.json').then((module): Dictionary => module.default),
};

export const getDictionary = async (locale: string) => {
  if (!dictionaries[locale]) {
    return dictionaries['en']();
  }
  return dictionaries[locale]();
};
