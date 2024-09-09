"use client";
import { useState } from "react";
import { DataTable } from "../tools/DataTable";
import { fuelcolumns } from "./columns/Fuel";
import { workordercolumns } from "./columns/Workorder";
import { reactiveMaintenanceColumns } from "./columns/reactiveMaintenanceColumns";
import { expensecolumns } from "./columns/expense";
import { milagecolumns } from "./columns/milage";
import {
  CompleteWorkOrder,
  FueldataType,
  ReactiveMaintenanceType,
  ExpensedataType,
  MilagedataType,
} from "@/lib/zod";
import { setDate } from "date-fns";
type TableData<T> = T[];
interface EquipHistoryProps {
  fueldata: FueldataType[];
  workorderdata: CompleteWorkOrder[];
  reacthistory: ReactiveMaintenanceType[];
  expensehistory: ExpensedataType[];
  milagehistory: MilagedataType[];
}

const EquipHistory = ({
  fueldata,
  workorderdata,
  reacthistory,
  expensehistory,
  milagehistory,
}: EquipHistoryProps) => {
  const [data, setData] = useState<TableData<any>>([]);
  const [columns, setColumns] = useState<any[]>([]);

  const buttons = [
    {
      label: "Fuel",
      onClick: () => {
        setData(fueldata);
        setColumns(fuelcolumns);
      },
    },
    {
      label: "Work Orders",
      onClick: () => {
        setData(workorderdata);
        setColumns(workordercolumns);
      },
    },
    {
      label: "Preventive Maintenance",
      onClick: () => {
        setData(reacthistory);
        setColumns(reactiveMaintenanceColumns);
      },
    },
    {
      label: "Expenses",
      onClick: () => {
        setData(expensehistory);
        setColumns(expensecolumns);
      },
    },
    {
      label: "Meter Log",
      onClick: () => {
        setData(milagehistory);
        setColumns(milagecolumns);
      },
    },
  ];
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-4">
        {buttons.map((button) => (
          <button
            key={button.label}
            onClick={button.onClick}
            className="border border-black text-black bg-transparent py-2 px-4 transition-colors duration-200 ease-in-out hover:bg-gray-700 hover:bg-opacity-70 hover:text-white"
          >
            {button.label}
          </button>
        ))}
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};
export default EquipHistory;
