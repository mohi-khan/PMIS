import { ColumnDef } from "@tanstack/react-table";
import { ReactiveMaintenanceType } from "@/lib/zod";
import SparePartShow from "./SparePartsShow";
import { DropdownMenu,DropdownMenuLabel, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface spareType {
  code: number;
  name: string;
  qty: number;
}

export const reactiveMaintenanceColumns: ColumnDef<ReactiveMaintenanceType>[] =
  [
  
    {
      accessorKey: "dateofmaintenance",
      header: "Date of Maintenance",
    },
    {
      accessorKey: "problemdescription",
      header: "Problem Description",
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
      header: "Labor Cost",
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
    {
      id: "actions",
      cell: ({ row }) => {
     
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  const maintenance = row.original;
  
                  try {
                    const isConfirmed = window.confirm(
                      "Are you sure you want to cancel this Entry"
                    );
  
                    if (!isConfirmed) return;
                    const mydata = { maintenance: maintenance.maintenanceid };
  
                    const response = await fetch(
                      `${process.env.NEXT_PUBLIC_API_PATH}cancel-maintainence`,
                      {
                        method: "POST", // Use DELETE or POST based on your API's requirement
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(mydata),
                      }
                    );
  
                    if (response.status === 200) {
                      const data = await response.json();
  
                      alert(
                        `Maintenance Entry Cancelled;  Maintenance Id: ${data.message}; Refresh the page`
                      );
                    } else {
                      console.error("Failed to cancel the Maintenance");
                    }
                  } catch (error) {
                    console.error("Error canceling the Task:", error);
                  }
                }}
              >
                Cancel
              </DropdownMenuItem>
             <DropdownMenuItem  onClick={ () => {
               const maintenance = row.original;
              window.location.href = `/reports/maintenance/${maintenance.equipment}/${maintenance.maintenanceid}`;}}>
              Show Report
             </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
