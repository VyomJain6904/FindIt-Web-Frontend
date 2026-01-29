import ResultsPageClient from './ResultsPageClient';

interface ResultsPageProps {
  params: Promise<{ scanId: string }>;
}

export default async function ResultsPage({ params }: ResultsPageProps) {
  const { scanId } = await params;

  return <ResultsPageClient scanId={scanId} />;
}
