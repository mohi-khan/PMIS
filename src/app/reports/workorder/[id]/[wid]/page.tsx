import { auth } from "@/auth";
import EquipmentHeader from "@/components/report/EquipmentHeader";
import { equipmentSchema } from "@/lib/zod";
import { woSchema } from "@/lib/zod";
interface EquipmentParams {
  params: {
    id: string;
    wid: string;
  };
}

export default async function App({ params }: EquipmentParams) {
  const equipid = Number(params.id);
  const wid = Number(params.wid);
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;
  //Equipment Data
  const response = await fetch(`${process.env.API_PATH}equipments/${equipid}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const myresult = await response.json();
  const equipmentdata = equipmentSchema.safeParse(myresult[0]);
  if (!equipmentdata.success) {
    console.log("Error parsing Equipment:", equipmentdata.error);
    throw new Error("invalid equipment type");
  }
  const { name, model, serial: serialNumber } = equipmentdata.data;

  // Create the equipmentDetails object with the required fields
  const equipmentDetails = {
    name,
    model,
    serialNumber,
  };
  //WorkorderData
  const workres = await fetch(`${process.env.API_PATH}workorderdet/${wid}`, {
    cache: "no-store",
  });

  if (!workres.ok) {
    throw new Error("Network response was not ok");
  }
  const woresult = await workres.json();
  const wodata = woSchema.safeParse(woresult[0]);
  if (!wodata.success) {
    console.log("Error parsing Equipment:", wodata.error);
    throw new Error("invalid workorder type");
  }
  const {
    id: workorderid,
    taskname,
    completedate,
    name: techname,
    position,
    tel,
    problem,
    spares,
    procedure,
    observation,
    attachment,
  } = wodata.data;

  const workorderDetails = {
    taskname,
    completedate,
    workorderid,
    serialNumber,
    techname,
    position,
    tel,
    problem,
    spares,
    procedure,
    observation,
    attachment,
  };
  return (
    <>
      <EquipmentHeader
        workorderDetails={workorderDetails}
        equipmentDetails={equipmentDetails}
        reporttype="Preventive Maintainence"
      />
    </>
  );
}
