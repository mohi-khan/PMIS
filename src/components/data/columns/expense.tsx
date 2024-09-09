import { ExpensedataType } from "@/lib/zod";
import { ColumnDef } from "@tanstack/react-table";

export const expensecolumns: ColumnDef<ExpensedataType>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "equipmentdesc",
    header: "Equipment Desc",
  },
  {
    accessorKey: "workorderid",
    header: "Worker Id",
  },
  {
    accessorKey: "reactivemaintenanceid",
    header: "Reactive Maintenance Id",
  },
  {
    accessorKey: "trandate",
    header: "Tran Date",
  },
  {
    accessorKey: "totalcost",
    header: "Total Cost",
  },
  {
    accessorKey: "comments",
    header: "Comments",
  },
];
