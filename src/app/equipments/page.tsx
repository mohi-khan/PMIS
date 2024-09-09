import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { equipmentType, overdue, OverdueType, TaskList } from "@/lib/zod";
import EquipmentList from "@/components/data/EquipmentList";
import { vendorList, tasklist } from "@/lib/zod";
import EquipAddComp from "@/components/data/EquipAddComp";

export default async function equipment() {
  const session = await auth();

  if (!session) return <div>Not authenticated</div>;

  const response = await fetch(`${process.env.API_PATH}equipments`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const result = await response.json();
  const equipments = equipmentType.safeParse(result);
  // Convert the fetched data to a map
  if (!equipments.success) {
    console.log("Error parsing Equipments:", equipments.error);
    throw new Error("invalid Equipments type");
  }

  const pendingresponse = await fetch(`${process.env.API_PATH}getoverdue`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const pendingresult = await pendingresponse.json();
  console.log(pendingresult.rows);
  const pendingtask = overdue.safeParse(pendingresult.rows);
  // Convert the fetched data to a map
  if (!pendingtask.success) {
    console.log("Error parsing Pending Task:", pendingtask.error);
    throw new Error("invalid Pedniding Task type");
  }
  /*For Dialog*/
  type mylist = {
    name: string;
  };
  const manres = await fetch(`${process.env.API_PATH}manufactururlist`, {
    cache: "no-store",
  });
  const manresult: mylist[] = await manres.json();
  const manufacturers = manresult.map((item) => item.name);

  const tasks = await fetch(`${process.env.API_PATH}tasklist`, {
    cache: "no-store",
  });
  const taskresult: TaskList = await tasks.json();
  const tasklist = taskresult.map((item) => ({
    id: item.id,
    name: item.name,
  }));
  const venres = await fetch(`${process.env.API_PATH}vendors`, {
    cache: "no-store",
  });

  const venresult: vendorList = await venres.json();

  const vendors = venresult.map((item) => ({
    id: item.id,
    name: item.name,
  }));
  const empres = await fetch(`${process.env.API_PATH}employees`, {
    cache: "no-store",
  });

  const empresult: vendorList = await empres.json();

  const employee = empresult.map((item) => ({
    id: item.id,
    name: item.name,
  }));
  return (
    <>
      <EquipAddComp
        manufacturers={manufacturers}
        vendors={vendors}
        equipmentno={equipments.data.length}
        username={session.user?.email || ""}
      />

      <div>
        <EquipmentList
          data={equipments.data}
          tasklist={tasklist}
          employee={employee}
          pendingtask={pendingtask.data}
          apipath={process.env.API_PATH || ""}
          username={session.user?.email || ""}
        />
      </div>
    </>
  );
}
