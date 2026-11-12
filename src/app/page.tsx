import SearchForm from "@/components/SearchForm";
import HomeMap from "@/components/map/HomeMap";

export default function Home() {
  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-h2 text-neutral-900 md:text-h1">Find your flight</h1>
          <p className="text-small text-neutral-600">Search and book flights in a few clicks</p>
        </div>

        <SearchForm />
      </div>

      <section className="space-y-3">
        <div className="space-y-1">
          <h2 className="text-h3 text-neutral-900">Where we fly</h2>
          <p className="text-small text-neutral-600">Click an airport to see the flights from there.</p>
        </div>
        <HomeMap />
      </section>
    </div>
  );
}