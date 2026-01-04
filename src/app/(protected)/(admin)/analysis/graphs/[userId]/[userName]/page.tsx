import AnalysisGraphsClient from "./analysis-graphs-client";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string; userName: string }>;
}) {
  const { userId, userName } = await params;
  return <AnalysisGraphsClient userId={userId} userName={userName} />;
}
