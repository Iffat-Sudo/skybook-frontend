import Results from "./Results";

type ResultsPageProps = {
  searchParams: Promise<{ from?: string; to?: string; date?: string; passengers?: string }>;
};

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const { from = "ARN", to = "", date = "", passengers = "1" } = await searchParams;

  return <Results from={from} to={to} date={date} passengers={passengers} />;
}