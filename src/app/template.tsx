// Re-mounts on every navigation → plays the sea-green curtain + content fade.
// Pure CSS, so it also works before JavaScript loads (no hydration issues).
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="page-curtain" aria-hidden="true">
        <span className="page-curtain-mark">TIDELINE</span>
      </div>
      <div className="page-enter">{children}</div>
    </>
  );
}
