import { FueldataType } from "@/lib/zod";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  {
    id: "actions",
    cell: ({ row }) => {
      const fuel = row.original;

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
                const fuel = row.original;

                try {
                  const isConfirmed = window.confirm(
                    "Are you sure you want to cancel this Entry"
                  );

                  if (!isConfirmed) return;
                  const mydata = { fuelentryid: fuel.fuelentryid };

                  const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_PATH}cancel-fuelentry`,
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
                      `Fuel Entry Cancelled; Fuel Entry Id: ${data.message}; Refresh the page`
                    );
                  } else {
                    console.error("Failed to cancel the Fuel Entry");
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
