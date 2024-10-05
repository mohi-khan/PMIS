import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  equipmentSchema,
  taskschlist,
  equipspare,
  fuelhistorydata,
  CompleteWorkOrder,
  workorderhistorydata,
  ReactiveMaintenanceType,
  maintenancehistorydata,
  expensehistorydata,
  milagehistorydata,
  vendorList,
} from "@/lib/zod";
import EquipmentView from "@/components/data/Equipments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import EquipTaskList from "@/components/data/EquipTaskList";
import EqupSpare from "@/components/data/EquipSpare";
import EquipHistory from "@/components/data/EquipHistory";
import { FueldataType, ExpensedataType, MilagedataType } from "@/lib/zod";
import TopDiv from "@/components/data/TopDiv";
import MonthlyCosts from "@/components/data/BottomDivEquip";
import EquipmentEdit from "@/components/data/EquipmentEdit";
import EquipEditComp from "@/components/data/EquipEditComp";
interface EquipmentParams {
  params: {
    id: string;
  };
}
export default async function App({ params }: EquipmentParams) {
  const equipid = Number(params.id);
  const session = await auth();

  if (!session) return <div>Not authenticated</div>;
  async function getFuelData(): Promise<FueldataType[]> {
    // Fetch data for FuelHistory on history tab.
    const fuelres = await fetch(
      `${process.env.API_PATH}fuelhistory/${equipid}`,
      {
        cache: "no-store",
      }
    );

    if (!fuelres.ok) {
      throw new Error("Network response was not ok");
    }
    const fuelhistory = await fuelres.json();
    const fueldata = fuelhistorydata.safeParse(fuelhistory);
    if (!fueldata.success) {
      console.log("Error parsing Fuel:", fueldata.error);
      throw new Error("invalid Fuel Data");
    }
    return fueldata.data;
  }
  const fueldata = await getFuelData();

  async function getWorkOrderData(): Promise<CompleteWorkOrder[]> {
    // Fetch data for workorderhistory on history tab.
    const workorderres = await fetch(
      `${process.env.API_PATH}workorderhistory/${equipid}`,
      {
        cache: "no-store",
      }
    );

    if (!workorderres.ok) {
      throw new Error("Network response was not ok");
    }
    const workorderhistory = await workorderres.json();

    const workorderdata = workorderhistorydata.safeParse(workorderhistory);
    if (!workorderdata.success) {
      console.log("Error parsing workorder:", workorderdata.error);
      throw new Error("invalid workorder Data");
    }
    return workorderdata.data;
  }
  const workorderdata = await getWorkOrderData();

  //For history tab data
  async function getMaintenaceData(): Promise<ReactiveMaintenanceType[]> {
    // Fetch data for workorderhistory on history tab.
    const matainenceres = await fetch(
      `${process.env.API_PATH}reactivehistory/${equipid}`,
      {
        cache: "no-store",
      }
    );

    if (!matainenceres.ok) {
      throw new Error("Network response was not ok");
    }
    const maintainecehistory = await matainenceres.json();
    console.log(maintainecehistory);
    const maintainencedata =
      maintenancehistorydata.safeParse(maintainecehistory);
    if (!maintainencedata.success) {
      console.log("Error parsing Maintainance:", maintainencedata.error);
      throw new Error("invalid Maintainance Data");
    }
    return maintainencedata.data;
  }
  const mainthistory = await getMaintenaceData();
  //For Expense
  async function getExpenseData(): Promise<ExpensedataType[]> {
    // Fetch data for FuelHistory on history tab.
    const expenseres = await fetch(
      `${process.env.API_PATH}expensehistory/${equipid}`,
      {
        cache: "no-store",
      }
    );

    if (!expenseres.ok) {
      throw new Error("Network response was not ok");
    }
    const expensehistory = await expenseres.json();
    const expensedata = expensehistorydata.safeParse(expensehistory);
    if (!expensedata.success) {
      console.log("Error parsing Expense:", expensedata.error);
      throw new Error("invalid Expense Data");
    }
    return expensedata.data;
  }
  const expensedata = await getExpenseData();
  //For Meter Data
  async function getMeterData(): Promise<MilagedataType[]> {
    // Fetch data for FuelHistory on history tab.
    const milageres = await fetch(
      `${process.env.API_PATH}milagehistory/${equipid}`,
      {
        cache: "no-store",
      }
    );

    if (!milageres.ok) {
      throw new Error("Network response was not ok");
    }
    const milagehistory = await milageres.json();
    const milagedata = milagehistorydata.safeParse(milagehistory);
    if (!milagedata.success) {
      console.log("Error parsing Milage:", milagedata.error);
      throw new Error("invalid Milage Data");
    }
    return milagedata.data;
  }
  const milagedata = await getMeterData();
  //////For Equipment Data////////////////
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

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  //// For Manufacturur data
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
  ///Vendor List
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

  const employees = empresult.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  //////// For Task Data

  const taskres = await fetch(`${process.env.API_PATH}tasksch/${equipid}`, {
    cache: "no-store",
  });

  if (!taskres.ok) {
    throw new Error("Network response was not ok");
  }
  const taskresult = await taskres.json();
  const equiptask = taskschlist.safeParse(taskresult.rows);

  if (!equiptask.success) {
    console.log("Error parsing Equipment Tasks:", equiptask.error);
    throw new Error("invalid equipment type");
  }
  ////For Spare Data
  const spareres = await fetch(
    `${process.env.API_PATH}spareWithEquipments/${equipid}`,
    {
      cache: "no-store",
    }
  );

  if (!spareres.ok) {
    throw new Error("Network response was not ok");
  }
  const spareresult = await spareres.json();
  const equpspare = equipspare.safeParse(spareresult);
  if (!equpspare.success) {
    console.log("Error parsing Spare:", equpspare.error);
    throw new Error("invalid Spare Data");
  }

  return (
    <>
      <table className="w-full">
        <tbody>
          <tr>
            <td className="flex items-center">
              <Link href="/others/equipments">
                <FaArrowLeft className="text-xl mr-2 cursor-pointer" />
              </Link>
              <h1 className="text-xl text-black">{`${equipmentdata.data.name}/${equipmentdata.data.model}`}</h1>
            </td>
            <td className="text-right">
              <EquipEditComp
                equipmentdata={equipmentdata.data}
                manufacturers={manufacturers}
                vendors={vendors}
                username={session.user?.email || ""}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <Tabs defaultValue="identification" className="w-f">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="identification">Identification</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="parts">Parts</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="attachments">Attachments</TabsTrigger>
        </TabsList>
        <TabsContent value="identification">
          <div className="flex h-screen">
            {/* Left Div */}
            <div className="w-1/2 bg-gray-200">
              <EquipmentView data={equipmentdata.data} />
            </div>

            {/* Right Div */}
            <div className="w-1/2 flex flex-col">
              <div className="h-3/10 bg-gray-400">
                <TopDiv equipid={equipmentdata.data.id} />
              </div>
              <div className="h-7/10 bg-gray-500">
                <MonthlyCosts equipid={equipmentdata.data.id} />
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="tasks">
          <EquipTaskList equipid={equipmentdata.data.id} data={equiptask.data} vendors={vendors}  username={session.user?.email || ""} employee={employees} equipdesc={`${equipmentdata.data.name}/${equipmentdata.data.model}`}/>
        </TabsContent>
        <TabsContent value="parts">
          <EqupSpare spares={equpspare.data} />
        </TabsContent>
        <TabsContent value="history">
          <EquipHistory
            fueldata={fueldata}
            workorderdata={workorderdata}
            reacthistory={mainthistory}
            expensehistory={expensedata}
            milagehistory={milagedata}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
