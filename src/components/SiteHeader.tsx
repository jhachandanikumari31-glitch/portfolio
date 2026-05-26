'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { NAV_LINKS, SITE } from '@/lib/site';

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    return () => document.body.classList.remove('nav-open');
  }, [open]);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [close]);

  return (
    <header className="site-header">
      <Link href="/" className="brand">
        <div className="brand-mark" aria-hidden="true">
          <span>G</span>
        </div>
        <div>
          <p className="brand-title">{SITE.name}</p>
          <p className="brand-subtitle">{SITE.tagline}</p>
        </div>
      </Link>

      <button
        type="button"
        className="nav-toggle"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="siteNav"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="nav-toggle-icon" aria-hidden="true" />
      </button>

      <nav className={`navbar${open ? ' is-open' : ''}`} id="siteNav">
        {NAV_LINKS.map(({ href, label }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`nav-link${active ? ' active' : ''}`}
              onClick={close}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
