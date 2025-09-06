"use client";

import GlowCard from "./glow-card"; // no need for dynamic here

export default function GlowCardsWrapper({ identifier = "main" }) {
  return <GlowCard identifier={identifier}>Example Glow Card</GlowCard>;
}
