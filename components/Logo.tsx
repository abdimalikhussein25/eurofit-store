import Link from 'next/link';
export function Logo({ light=false }: { light?: boolean }) {
  return <Link href="/" className={`logo ${light?'logo-light':''}`} aria-label="Eurofit home">
    <svg className="brand-symbol" viewBox="0 0 90 60" aria-hidden="true"><path fill="currentColor" d="M8 35h38l-9 12H0zM22 12h48L58 25H12z"/><path fill="#c8fc42" d="M44 29h31L52 57H29zM51 1h24L63 12H43z"/><circle cx="77" cy="8" r="7" fill="#c8fc42"/></svg>
    <span className="logo-text">EURO<span>FIT</span></span>
  </Link>;
}
