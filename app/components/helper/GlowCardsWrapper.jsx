"use client";

import GlowCard from "./glow-card"; // Make sure this is the path to your GlowCard component

const cardsData = [
  { id: 1, title: "Card 1", content: "This is card 1" },
  { id: 2, title: "Card 2", content: "This is card 2" },
  { id: 3, title: "Card 3", content: "This is card 3" },
];

export default function GlowCardsWrapper() {
  return (
    <div className="glow-cards-wrapper grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {cardsData.map((card) => (
        <GlowCard key={card.id} identifier={card.id}>
          <h3 className="text-lg font-bold">{card.title}</h3>
          <p>{card.content}</p>
        </GlowCard>
      ))}
    </div>
  );
}
