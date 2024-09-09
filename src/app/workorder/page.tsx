import { auth } from "@/auth";

import { workOrderlist, vendorList, equipmentType } from "@/lib/zod";

import { Button } from "@/components/ui/button";
import TaskList from "@/components/data/TaskList";
import TaskAdd from "@/components/data/TaskAdd";
import { ResponsiveDialog } from "@/components/dialogui/Dialogui";
import WorkOrderList from "@/components/data/WorkOrderList";

export default async function task() {
  const session = await auth();

  if (!session) return <div>Not authenticated</div>;

  const response = await fetch(`${process.env.API_PATH}workorders`, {
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const result = await response.json();

  const workorders = workOrderlist.safeParse(result);
  if (!workorders.success) {
    console.log("Error parsing workorder:", workorders.error);
    //throw new Error("invalid Notificaton type");
  }
  const equipres = await fetch(`${process.env.API_PATH}equipments`, {
    cache: "no-cache",
  });

  if (!equipres.ok) {
    throw new Error("Network response was not ok");
  }

  const equipdet = await equipres.json();

  const equipdetails = equipmentType.safeParse(equipdet);
  if (!equipdetails.success) {
    console.log("Error parsing workorder:", equipdetails.error);
    //throw new Error("invalid Notificaton type");
  }

  return (
    <>
      <div>
        <WorkOrderList
          key="workorderlist"
          data={workorders.data || []}
          equipdata={equipdetails.data || []}
          username={session.user?.email || ""}
        />
      </div>
    </>
  );
}
