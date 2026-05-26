'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CAROUSEL_IMAGES } from '@/lib/site';

const INTERVAL_MS = 4500;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % CAROUSEL_IMAGES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="carousel" aria-label="Featured project imagery" aria-live="polite">
      {CAROUSEL_IMAGES.map((src, i) => (
        <div key={src} className={`carousel-slide${i === index ? ' active' : ''}`}>
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 980px) 100vw, 50vw"
            priority={i === 0}
            className="carousel-image"
          />
        </div>
      ))}
    </div>
  );
}
