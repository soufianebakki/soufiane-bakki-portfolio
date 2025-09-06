"use client";

import dynamic from 'next/dynamic';

// Use dynamic import with ssr: false for the GlowCard
const GlowCard = dynamic(() => import('./glow-card'), { 
  ssr: false 
});

export default function GlowCardsWrapper() {
  const cardsData = [
    { id: 1, title: "Card 1", content: "This is card 1" },
    { id: 2, title: "Card 2", content: "This is card 2" },
    { id: 3, title: "Card 3", content: "This is card 3" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
      {cardsData.map((card) => (
        <GlowCard key={card.id} identifier={card.id}>
          <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
          <p>{content}</p>
        </GlowCard>
      ))}
    </div>
  );
}