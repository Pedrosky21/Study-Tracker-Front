"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

export default function Loading() {
  const line1Ref = useRef<HTMLDivElement | null>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!line1Ref.current) return;

    animate(line1Ref.current, {
      ease: "easeInOutSine",
      translateY: [0, -20, 0],
      loop: true,
      loopDelay: 200,
    });

    if (!line2Ref.current) return;
    animate(line2Ref.current, {
      ease: 'easeInOutSine',
      translateY: [0, -20, 0],
      loop: true,
      loopDelay: 200,
      delay: 200
    });

    if (!line3Ref.current) return;
    animate(line3Ref.current, {
      ease: 'easeInOutSine',
      translateY: [0, -20, 0],
      loop: true,
      loopDelay: 200,
      delay: 400
    });
  }, []);

  return (
    <>
      <div className="flex space-x-10 justify-center items-center w-screen h-screen m-0 p-0 overflow">
        <div ref={line1Ref} className="line w-4 h-4 rounded-full bg-dark-green"></div>
        <div ref={line2Ref} className="line w-4 h-4 rounded-full bg-dark-green"></div>
        <div ref={line3Ref} className="line w-4 h-4 rounded-full bg-dark-green"></div>
      </div>
    </>
  );
}
