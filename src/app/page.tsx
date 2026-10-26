import SearchForm from "@/components/SearchForm";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-h2 text-neutral-900 md:text-h1">Find your flight</h1>
        <p className="text-small text-neutral-600">Search and book flights in a few clicks</p>
      </div>

      <SearchForm />
    </div>
  );
}