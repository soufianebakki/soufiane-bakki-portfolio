// components/helper/GlowCardsWrapper.jsx
"use client";

import GlowCard from "./glow-card"; // directly import client GlowCard

export default function GlowCardsWrapper({ children, identifier }) {
  return <GlowCard identifier={identifier}>{children}</GlowCard>;
}
