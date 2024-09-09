import { FueldataType } from "@/lib/zod";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const fuelcolumns: ColumnDef<FueldataType>[] = [
  {
    accessorKey: "fueldate",
    header: "Fuel Date",
  },
  {
    accessorKey: "fuelqty",
    header: "Qty",
  },
  {
    accessorKey: "fuelunit",
    header: "Unit",
  },
  {
    accessorKey: "lastmilage",
    header: "Last Milage",
  },
  {
    accessorKey: "currentmilage",
    header: "Current Milage",
  },
  {
    accessorKey: "runninghour",
    header: "Running Hours",
  },
  {
    accessorKey: "vendorname",
    header: "Vendor Name",
  },
];
