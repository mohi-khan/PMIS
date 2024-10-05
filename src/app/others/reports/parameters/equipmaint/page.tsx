import { auth } from "@/auth";
import MaintenanceParameter from "@/components/report/MaintenanceParameter";
export default async function reports() {
  const session = await auth();

  if (!session) return <div>Not authenticated</div>;
  return (
    <>
      <div>
        <MaintenanceParameter />
      </div>
    </>
  );
}
