import { auth } from "@/auth";

import { workOrderlist,  equipmentType } from "@/lib/zod";


import WorkOrderList from "@/components/data/WorkOrderList";

export default async function workorders() {
  const session = await auth();

  if (!session) return <div>Not authenticated</div>;

 
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
  const workres = await fetch(`${process.env.API_PATH}workorderlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    },
    cache: "no-cache"
  });
 
  if (!workres.ok) {
    throw new Error("Network response was not ok");
  }

  const result = await workres.json();
  
  const workorders = await workOrderlist.safeParse(result);

  if (!workorders.success) {
    console.log("Error parsing workorder:", workorders.error);
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
