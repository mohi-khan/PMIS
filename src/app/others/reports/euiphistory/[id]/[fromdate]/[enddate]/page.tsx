import { auth } from "@/auth";
import EquipHistory from "@/components/data/EquipHistory";
import EquipmentHeader from "@/components/report/EquipmentHeader";
import EquipmentHistory from "@/components/report/EquipmentHistory";
import { equipmentSchema, fuelhistory, fuelhistorydata, wolists } from "@/lib/zod";
import { woSchema } from "@/lib/zod";
interface EquipmentParams {
  params: {
    id: string;
    fromdate:string;
    enddate:string;
  };
}

export default async function App({ params }: EquipmentParams) {

  const { id, fromdate, enddate } = params;
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Format fromdate and todate as yyyy-mm-dd strings
  const formattedFromDate = formatDate(new Date(fromdate));
  const formattedToDate = formatDate(new Date(enddate));
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;
  //Equipment Data
  const response = await fetch(`${process.env.API_PATH}equipments/${id}`, {
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
  //Reactive Maintainenance data
 
  const workorderes = await fetch(`${process.env.API_PATH}maintenancedet/${id}/${formattedFromDate}/${formattedToDate}`, {
    cache: "no-store",
  });

  if (!workorderes.ok) {
    throw new Error("Network response was not ok");
  }
  const workorderresult = await workorderes.json();
  const workdata = wolists.safeParse(workorderresult);
  if (!workdata.success) {
    console.log("Error parsing Equipment:", workdata.error);
    throw new Error("invalid workorder type");
  }
  const maintainenceDet = workdata.data.map(worker => ({
   
    taskname: worker.taskname,
    completedate: worker.completedate,
    workorderid: worker.id,
    techname: worker.name,  // Mapping `name` to `techname`
    position: worker.position,
    tel: worker.tel,
    problem: worker.problem,
    spares: worker.spares,
    procedure: worker.procedure,
    observation: worker.observation,
    attachment: worker.attachment,
  }));
  //Workorder Maintenance Data

  const workres = await fetch(`${process.env.API_PATH}workorderdet/${id}/${formattedFromDate}/${formattedToDate}`, {
    cache: "no-store",
  });

  if (!workres.ok) {
    throw new Error("Network response was not ok");
  }
  const woresult = await workres.json();
  const wodata = wolists.safeParse(woresult);
  if (!wodata.success) {
    console.log("Error parsing Equipment:", wodata.error);
    throw new Error("invalid workorder type");
  }
  const workorderdet = wodata.data.map(worker => ({
   
    taskname: worker.taskname,
    completedate: worker.completedate,
    workorderid: worker.id,
    techname: worker.name,  // Mapping `name` to `techname`
    position: worker.position,
    tel: worker.tel,
    problem: worker.problem,
    spares: worker.spares,
    procedure: worker.procedure,
    observation: worker.observation,
    attachment: worker.attachment,
  }));
  
  //Fuel History Data

  const fuelres = await fetch(`${process.env.API_PATH}fuelreports/${id}/${formattedFromDate}/${formattedToDate}`, {
    cache: "no-store",
  });

  if (!fuelres.ok) {
    throw new Error("Network response was not ok");
  }
  const fuelresult = await fuelres.json();
  const fueldata = fuelhistory.safeParse(fuelresult);
  if (!fueldata.success) {
    console.log("Error parsing Equipment:", fueldata.error);
    throw new Error("invalid workorder type");
  }
  
 
  
  return (
    <>
      <EquipmentHistory
        workorderDetails={workorderdet}
        reactMainDetails={maintainenceDet}
        equipmentDetails={equipmentDetails}
        fuelhistory={fueldata.data}
        reporttype="Reactive Maintainence"
      />
    </>
  );
}
