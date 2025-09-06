"use client";

import { useEffect, useState } from "react";

const GlowCard = ({ children, identifier }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window === "undefined") return;

    const CONTAINER = document.querySelector(`.glow-container-${identifier}`);
    const CARDS = document.querySelectorAll(`.glow-card-${identifier}`);
    if (!CONTAINER || !CARDS.length) return;

    const CONFIG = { proximity: 40, spread: 80, blur: 12, gap: 32, vertical: false, opacity: 0 };
    const UPDATE = (event) => {
      for (const CARD of CARDS) {
        const B = CARD.getBoundingClientRect();
        CARD.style.setProperty("--active", event?.x > B.left - CONFIG.proximity &&
          event?.x < B.left + B.width + CONFIG.proximity &&
          event?.y > B.top - CONFIG.proximity &&
          event?.y < B.top + B.height + CONFIG.proximity ? 1 : CONFIG.opacity);

        const CENTER = [B.left + B.width / 2, B.top + B.height / 2];
        let ANGLE = (Math.atan2(event?.y - CENTER[1], event?.x - CENTER[0]) * 180) / Math.PI;
        CARD.style.setProperty("--start", (ANGLE < 0 ? ANGLE + 360 : ANGLE) + 90);
      }
    };

    document.body.addEventListener("pointermove", UPDATE);
    return () => document.body.removeEventListener("pointermove", UPDATE);
  }, [identifier]);

  if (!isClient) {
    return <div className="h-fit cursor-pointer border bg-[#101123] text-gray-200 rounded-xl w-full">{children}</div>;
  }

  return (
    <div className={`glow-container-${identifier} glow-container`}>
      <article className={`glow-card glow-card-${identifier} h-fit cursor-pointer border transition-all duration-300 relative bg-[#101123] text-gray-200 rounded-xl hover:border-transparent w-full`}>
        <div className="glows"></div>
        {children}
      </article>
    </div>
  );
};

export default GlowCard;
