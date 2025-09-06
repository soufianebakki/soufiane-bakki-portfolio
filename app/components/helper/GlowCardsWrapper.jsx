"use client";

import GlowCard from "./glow-card";

export default function GlowCardsWrapper({ cards }) {
  return (
    <div className="flex flex-wrap gap-4">
      {cards.map((card) => (
        <GlowCard key={card.id} identifier={card.id}>
          {card.content}
        </GlowCard>
      ))}
    </div>
  );
}
