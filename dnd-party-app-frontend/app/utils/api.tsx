import { Spell } from '@/types/Spell';

const BASE_URL = "https://www.dnd5eapi.co";

interface SpellIndex {
  index: string;
  name: string;
  url: string;
}

interface SpellIndexResponse {
  count: number;
  results: SpellIndex[];
}

export async function getAllSpells(): Promise<Spell[]> {
  const spellIndexes: SpellIndexResponse = await fetch(BASE_URL + "/api/2014/spells").then(
    (response) => response.json()
  );
  return Promise.all(
    spellIndexes.results.map((index) =>
      fetch(BASE_URL + index.url).then((response) => response.json())
    )
  );
}