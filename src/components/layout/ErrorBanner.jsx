export default function ErrorBanner({ error }) {
  if (!error) return null;

  return (
    <div
      role="alert"
      className="
        border-b border-red-900/40
        bg-red-950/40
        px-6 py-3
        text-sm text-red-300
        backdrop-blur
      "
    >
      ⚠ {error}
    </div>
  );
}