"use client";

import { useEffect, useState, useRef } from "react";

export default function GlowCard({ children, identifier }) {
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    setIsClient(true);

    if (typeof window === "undefined") return; // extra safety

    const CONTAINER = containerRef.current;
    const CARDS = cardsRef.current;

    if (!CONTAINER || !CARDS.length) return;

    const CONFIG = {
      proximity: 40,
      spread: 80,
      blur: 12,
      gap: 32,
      vertical: false,
      opacity: 0,
    };

    const handlePointerMove = (event) => {
      for (const CARD of CARDS) {
        const bounds = CARD.getBoundingClientRect();
        const isInside =
          event.x > bounds.left - CONFIG.proximity &&
          event.x < bounds.left + bounds.width + CONFIG.proximity &&
          event.y > bounds.top - CONFIG.proximity &&
          event.y < bounds.top + bounds.height + CONFIG.proximity;

        CARD.style.setProperty("--active", isInside ? 1 : CONFIG.opacity);

        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;
        let angle = (Math.atan2(event.y - centerY, event.x - centerX) * 180) / Math.PI;
        angle = angle < 0 ? angle + 360 : angle;

        CARD.style.setProperty("--start", angle + 90);
      }
    };

    const applyStyles = () => {
      CONTAINER.style.setProperty("--gap", CONFIG.gap);
      CONTAINER.style.setProperty("--blur", CONFIG.blur);
      CONTAINER.style.setProperty("--spread", CONFIG.spread);
      CONTAINER.style.setProperty("--direction", CONFIG.vertical ? "column" : "row");
    };

    applyStyles();
    document.body.addEventListener("pointermove", handlePointerMove);

    return () => {
      document.body.removeEventListener("pointermove", handlePointerMove);
    };
  }, [identifier]);

  // During SSR: simple div to avoid "document is not defined"
  if (!isClient) {
    return (
      <div
        className="h-fit cursor-pointer border border-[#2a2e5a] bg-[#101123] text-gray-200 rounded-xl w-full"
        ref={(el) => (cardsRef.current[0] = el)}
      >
        {children}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`glow-container-${identifier} glow-container`}>
      <article
        ref={(el) => (cardsRef.current[0] = el)}
        className={`glow-card glow-card-${identifier} h-fit cursor-pointer border border-[#2a2e5a] transition-all duration-300 relative bg-[#101123] text-gray-200 rounded-xl hover:border-transparent w-full`}
      >
        <div className="glows"></div>
        {children}
      </article>
    </div>
  );
}
