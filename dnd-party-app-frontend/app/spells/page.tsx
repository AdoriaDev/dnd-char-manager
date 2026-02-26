'use client';
import { useEffect, useState } from "react";
import { getAllSpells } from "../utils/api";
import { Spell } from "@/types/Spell";
import SpellCard from "../../components/SpellCard";

export default function SpellDirectory() {
  const [spells, setSpells] = useState<Spell[]>([]);

    useEffect(() => {
    const savedSpells = localStorage.getItem("spells");
    if (savedSpells) setSpells(JSON.parse(savedSpells));
    getAllSpells().then((spells) => {
        setSpells(spells);
        localStorage.setItem("spells", JSON.stringify(spells));
    });
    }, []);

    return (
    <div className="App">
        {spells.length === 0 && <span className="loading">Loading...</span>}
        <ul className="spell-list">
        {spells.map((spell) => (
            <SpellCard key={spell.index} spell={spell} />
        ))}
        </ul>
    </div>
    );
}