import { ColumnDef } from "@tanstack/react-table";
import { ReactiveMaintenanceType } from "@/lib/zod";
import SparePartShow from "./SparePartsShow";
interface spareType {
  code: number;
  name: string;
  qty: number;
}

export const reactiveMaintenanceColumns: ColumnDef<ReactiveMaintenanceType>[] =
  [
    {
      accessorKey: "datereported",
      header: "Date Reported",
    },
    {
      accessorKey: "dateofmaintenance",
      header: "Date of Maintenance",
    },
    {
      accessorKey: "problemdescription",
      header: "Problem Description",
    },
    {
      accessorKey: "reportedby",
      header: "Reported By",
    },
    {
      accessorKey: "asssigtechnician",
      header: "Assigned Technician",
    },
    {
      accessorKey: "maintenancetype",
      header: "Maintenance Type",
    },
    {
      accessorKey: "workperformed",
      header: "Work Performed",
    },
    {
      accessorKey: "partused",
      header: "Part Used",
      cell: ({ row }) => {
        const spareData: spareType[] = row.getValue("partused");
        return <SparePartShow spareData={spareData} />;
      },
    },
    {
      accessorKey: "laborhours",
      header: "Labor Hours",
    },
    {
      accessorKey: "costofparts",
      header: "Cost of Parts",
    },
    {
      accessorKey: "completiondate",
      header: "Completion Date",
    },
    {
      accessorKey: "comments",
      header: "Comments",
    },
    {
      accessorKey: "preventivemeasures",
      header: "Preventive Measures",
    },
    {
      accessorKey: "vendorinformation",
      header: "Vendor Information",
    },
    {
      accessorKey: "attachments",
      header: "Attachments",
      cell: ({ getValue }) => {
        const attachments: string[] = getValue<any["attachments"]>();
        const apppath = process.env.NEXT_PUBLIC_API_PATH;
        return (
          <div>
            {attachments && attachments.length > 0
              ? attachments.map((attachment, index) => (
                  <div key={index}>
                    <a
                      href={`${apppath}download/${attachment}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {attachment}
                    </a>
                  </div>
                ))
              : "No Attachments"}
          </div>
        );
      },
    },
  ];
