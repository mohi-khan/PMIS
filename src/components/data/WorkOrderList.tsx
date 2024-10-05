"use client";
import React from "react";
import { useState } from "react";

import {
  WorkOrderType,
  equipmentType,
  equipmentlist,
  vendorList,
} from "../../lib/zod";
import { ResponsiveDialog } from "../dialogui/Dialogui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { Button } from "../ui/button";
import WorkOrderComplete from "./CompleteWorkOrder";

export default function WorkOrderList({
  data,
  equipdata,
  username,
}: {
  data: WorkOrderType;
  equipdata: equipmentlist[];
  username: string;
}) 
{
  const [isOpen, setIsOpen] = useState(false);
  const [equipId, setEquipId] = useState(0);
  const [workorderId, setWorkorderId] = useState(0);
  const [equipDetails, setEquipDetails] = useState("");
  const [workorders, setWorkorders] = useState(data); 
  const cancelworkorder=async(id:number)=>{
    try {
      const isConfirmed = window.confirm("Are you sure you want to cancel this workorder?");
      if (isConfirmed) {
      const mydata={workorderid:id};
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}cancel-workorder`, {
        method: "POST", // Use DELETE or POST based on your API's requirement
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mydata)

      });
      
      if (response.ok) {
        // Task canceled, refresh the task list by removing the canceled task from the state
        const updatedWorkorder = workorders.filter(workorder => workorder.id !== id);
        setWorkorders(updatedWorkorder);
      } else {
        console.error("Failed to cancel the workorder");
      }}
    } catch (error) {
      console.error("Error canceling the workorder:", error);
    }}
    const handleRefresh = (id:number) => {
      const updatedWorkorder = workorders.filter(workorder => workorder.id !== id);
      setWorkorders(updatedWorkorder);
    };
    return (
    <>
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`Close WorkOrder: ${equipDetails}`}
      >
        <WorkOrderComplete
          onSubmit={handleRefresh}
          workorderid={workorderId}
          equipmentid={equipId}
          equipmentdata={equipdata}
          username={username}
          setIsOpen={setIsOpen}
        />
      </ResponsiveDialog>
      <div className="table-auto w-full bg-white rounded-lg overflow-hidden shadow-md">
        <table className="table-auto w-full bg-white rounded-lg overflow-hidden shadow-md ">
          <thead className="bg-white text-gray-900 dark:bg-white">
            <tr>
              <th className="py-2 px-4 font-sans text-base text-left">
                Equipment
              </th>
              <th className="py-2 px-4 font-sans text-base text-left">Task</th>
              <th className="py-2 px-4 font-sans text-base text-left">
                Asignee
              </th>
              <th className="py-2 px-4 font-sans text-base text-left">
                Vendors
              </th>
              <th className="py-2 px-4 font-sans text-base text-left">
                Schedule Date
              </th>
              <th className="py-2 px-4 font-sans text-base text-left">
                Due Date
              </th>
              <th className="py-2 px-4 font-sans text-base text-left">Notes</th>
              <th className="py-2 px-4 font-sans text-base text-left">
                Priority
              </th>
              <th className="py-2 px-4 font-sans text-base text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {workorders.map((workorder, index) => (
              <>
                <tr key={index} className="bg-white text-gray-800">
                  <td className="py-2 px-4 hover:bg-gray-200 text-sm">
                    {`${workorder.equipmentname}/${workorder.equipmentmodel}`}
                  </td>
                  <td className="py-2 px-4 hover:{bg-gray-200 text-sm}">
                    {workorder.task}
                  </td>
                  <td className="py-2 px-4 text-sm">{workorder.assignee}</td>
                  <td className="py-2 px-4 text-sm">{workorder.vendors}</td>
                  <td className="py-2 px-4 text-sm">
                    {workorder.scheduledate}
                  </td>
                  <td className="py-2 px-4 text-sm">{workorder.duedate}</td>
                  <td className="py-2 px-4 text-sm">{workorder.notes}</td>
                  <td className="py-2 px-4 text-sm">{workorder.priority}</td>
                  <td className="py-2 px-4 text-sm">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button>
                          <IoIosArrowDropdownCircle />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuTrigger>
                        <DropdownMenuContent className="w-22">
                          <DropdownMenuLabel>
                            <button
                              onClick={() => {
                                setEquipId(workorder.equipmentid);
                                setWorkorderId(workorder.id);
                                setEquipDetails(
                                  `${workorder.equipmentname}/${workorder.equipmentmodel}`
                                );
                                setIsOpen(true);
                              }}
                              className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                            >
                              Complete Work Order
                            </button>
                          </DropdownMenuLabel>
                          <DropdownMenuLabel>
                            <button
                              onClick={() => {
                               cancelworkorder(workorder.id)
                              }}
                              className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                            >
                              Cancel Work Order
                            </button>
                          </DropdownMenuLabel>
                        </DropdownMenuContent>
                      </DropdownMenuTrigger>
                    </DropdownMenu>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
        <br />
      </div>
    </>
  );
}
