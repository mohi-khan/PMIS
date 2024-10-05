import { auth } from "@/auth";
import FormReport from "@/components/report/FormReport";
export default async function reports() {
  const session = await auth();

  if (!session) return <div>Not authenticated</div>;
  return (
    <>
      <div>
        <FormReport />
      </div>
    </>
  );
}
