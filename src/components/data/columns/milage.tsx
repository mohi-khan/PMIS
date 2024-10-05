import { MilagedataType } from "@/lib/zod";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
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
            <DropdownMenuItem
              onClick={async () => {
                const meter = row.original;

                try {
                  const isConfirmed = window.confirm(
                    "Are you sure you want to cancel this Entry"
                  );

                  if (!isConfirmed) return;
                  const mydata = { meterupdateid: meter.meterupdateid };

                  const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_PATH}cancel-meter`,
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
                      `Meter Entry Cancelled; Meter Entry Id: ${data.message}; Refresh the page`
                    );
                  } else {
                    console.error("Failed to cancel the Meter Entry");
                  }
                } catch (error) {
                  console.error("Error canceling the task:", error);
                }
              }}
            >
              Cancel
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
