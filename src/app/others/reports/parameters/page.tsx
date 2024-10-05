import { auth } from "@/auth";
import ReportCard from "@/components/card/ReportsParam";

export default async function reports() {
  const session = await auth();

  if (!session) return <div>Not authenticated</div>;
  return (
    <>
      <div>
        <ReportCard title="Reports" />
      </div>
    </>
  );
}
