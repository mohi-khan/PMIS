import Link from "next/link";
import { CompleteWorkOrder } from "@/lib/zod";
import { ColumnDef } from "@tanstack/react-table";
import SparePartShow from "./SparePartsShow";

interface spareType {
  code: number;
  name: string;
  qty: number;
}

export const workordercolumns: ColumnDef<CompleteWorkOrder>[] = [
  {
    accessorKey: "workorderid",
    header: "Work Order ID",
  },
  {
    accessorKey: "taskname",
    header: "Task Name",
  },
  {
    accessorKey: "scheduledate",
    header: "Schedule Date",
  },
  {
    accessorKey: "assigneename",
    header: "Assignee Name",
  },
  {
    accessorKey: "vendorname",
    header: "Vendor Name",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "workstarttime",
    header: "Work Start Time",
  },
  {
    accessorKey: "workcompletiontime",
    header: "Work Completion Time",
  },
  {
    accessorKey: "spare",
    header: "Spare",
    cell: ({ row }) => {
      const spareData: spareType[] = row.getValue("partused");
      return <SparePartShow spareData={spareData} />;
    },
  },
  {
    accessorKey: "completionnotes",
    header: "Completion Notes",
  },
  {
    accessorKey: "attachments",
    header: "Attachments",
    cell: ({ row }) => {
      const apppath = process.env.NEXT_PUBLIC_API_PATH;
      return (
        <div>
          {row.original.attachments?.map(
            (attachment: string, index: number) => (
              <div key={index}>
                <Link href={`${apppath}download/${attachment}`}>
                  {attachment}
                </Link>
              </div>
            )
          ) || "No Attachments"}
        </div>
      );
    },
  },
  {
    accessorKey: "totalcost",
    header: "Total Cost",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalcost"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BDT",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "metervalue",
    header: "Meter Value",
  },
  {
    accessorKey: "runninghour",
    header: "Running Hour",
  },
];
