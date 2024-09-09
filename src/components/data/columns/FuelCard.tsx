"use client";
import { FueldataType } from "@/lib/zod";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const fuelcolumns: ColumnDef<FueldataType>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "milagemeter",
    header: "Milage Run",
  },
  {
    accessorKey: "runninghours",
    header: "Running Hours",
  },
  {
    accessorKey: "fuelconsumed",
    header: "Fuel Consumed",
  },
  {
    accessorKey: "mileage_per_liter",
    header: "Milage/Litre",
    cell: ({ getValue }) => {
      const value = getValue<number>(); // Assuming the value is a number
      return value ? value.toFixed(2) : "0.00";
    },
  },
  {
    accessorKey: "running_hours_per_liter",
    header: "Running Hours/Litre",
    cell: ({ getValue }) => {
      const value = getValue<number>(); // Assuming the value is a number
      return value ? value.toFixed(2) : "0.00";
    },
  },
];
