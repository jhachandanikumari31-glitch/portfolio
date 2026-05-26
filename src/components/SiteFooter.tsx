import Link from 'next/link';

type SiteFooterProps = {
  title: string;
  description: string;
  cta?: { href: string; label: string };
  small?: boolean;
};

export function SiteFooter({ title, description, cta, small }: SiteFooterProps) {
  return (
    <footer className={`site-footer${small ? ' small-footer' : ''}`}>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {cta && (
        <Link href={cta.href} className="button primary">
          {cta.label}
        </Link>
      )}
    </footer>
  );
}
