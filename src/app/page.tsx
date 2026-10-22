export default function Home() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-8">
      <h1 className="text-h1 text-primary-900">SkyBook – H1</h1>
      <h2 className="text-h2">Heading 2</h2>
      <h3 className="text-h3">Heading 3</h3>
      <p className="text-body text-neutral-600">Body text: find and book your next flight.</p>
      <p className="text-small text-neutral-600">Small text</p>
      <p className="text-caption text-neutral-400">Caption text</p>

      <input
        className="h-12 w-full rounded-lg border border-neutral-200 bg-white px-4"
        placeholder="From (for example ARN)"
      />

      <button className="h-12 rounded-lg bg-primary-600 px-6 text-white hover:bg-primary-700">
        Search flights
      </button>

      <div className="rounded-lg bg-white p-6 shadow-card">
        <p className="text-h3">This is a card</p>
        <p className="text-small text-neutral-600">Radius 8 and a soft shadow.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="rounded-lg bg-success-50 px-3 py-1 text-small text-success-700">Confirmed</span>
        <span className="rounded-lg bg-error-50 px-3 py-1 text-small text-error-600">Cancelled</span>
        <span className="rounded-lg bg-warning-50 px-3 py-1 text-small text-warning-700">Delayed</span>
      </div>
    </main>
  );
}