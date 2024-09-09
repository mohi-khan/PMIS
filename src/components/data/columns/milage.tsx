import { MilagedataType } from "@/lib/zod";
import { ColumnDef } from "@tanstack/react-table";

export const milagecolumns: ColumnDef<MilagedataType>[] = [
  {
    accessorKey: "equipmentname",
    header: "Equipment Name",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "trandate",
    header: "Transaction Date",
  },
  {
    accessorKey: "milage",
    header: "Milage",
  },
  {
    accessorKey: "runninghour",
    header: "Running Hours",
  },
  {
    accessorKey: "fuelconsumed",
    header: "Fuel Consumed",
  },
  {
    accessorKey: "fuelunit",
    header: "Fuel Unit",
  },
];
