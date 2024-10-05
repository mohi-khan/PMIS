"use client";
import { equipments } from "@/lib/zod";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const equipment: ColumnDef<equipments>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Equipment Name",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "manufacturur",
    header: "Manufacturur",
  },
  {
    accessorKey: "slno",
    header: "Serial No",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "purchasedate",
    header: "Purchase Date",
  },
  {
    accessorKey: "runninghour",
    header: "Running Hours",
  },
  {
    accessorKey: "milagemeter",
    header: "Milage Meter",
  },

];
