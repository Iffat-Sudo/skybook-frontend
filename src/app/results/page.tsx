import Results from "./Results";

type ResultsPageProps = {
  searchParams: Promise<{ to?: string; date?: string; passengers?: string }>;
};

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const { to = "", date = "", passengers = "1" } = await searchParams;

  return <Results to={to} date={date} passengers={passengers} />;
}