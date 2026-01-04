import SurveyDetailClient from "./survey-detail-client";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string; session: string }>;
}) {
  const { userId, session } = await params;

  return <SurveyDetailClient userId={userId} session={session} />;
}
