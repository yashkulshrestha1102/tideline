import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        padding: '140px 24px 80px',
        background: 'var(--bg)',
      }}
    >
      <div>
        <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 'clamp(110px, 20vw, 240px)', lineHeight: 1, color: 'transparent', WebkitTextStroke: '1.5px #13786a' }}>
          404
        </div>
        <h1 style={{ fontFamily: 'var(--f-display)', fontWeight: 400, fontSize: 'clamp(32px, 4vw, 52px)', margin: '10px 0 0', color: 'var(--ink)' }}>
          This current led nowhere.
        </h1>
        <p style={{ color: 'var(--muted)', margin: '14px 0 30px' }}>The page you are looking for has drifted away.</p>
        <Link href="/" className="btn btn-primary" style={{ height: 54, padding: '0 28px' }}>
          Back to home
        </Link>
      </div>
    </main>
  );
}
