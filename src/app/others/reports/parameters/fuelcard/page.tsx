import { auth } from "@/auth";
import FuelParameter from "@/components/report/FuelParameter";
export default async function reports() {
  const session = await auth();

  if (!session) return <div>Not authenticated</div>;
  return (
    <>
      <div>
        <FuelParameter />
      </div>
    </>
  );
}
