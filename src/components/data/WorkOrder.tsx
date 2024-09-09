"use client";
import { vendorList } from "@/lib/zod";
import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function WorkOrder({
  equipmentId,
  equipDetails,
  taskid,
  taskname,
  employee,
  setIsOpen,
  vendors,
  apipath,
  username,
}: {
  equipmentId: number;
  equipDetails: string;
  taskid: number;
  taskname: string;
  employee: vendorList;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  vendors: vendorList;
  apipath: String;
  username: string;
}) {
  const [equipId, setEquipmentId] = useState(equipmentId);
  const [taskId, setTaskId] = useState(taskid);
  const [vendorId, setVendorId] = useState(vendors[0].id);
  const [scheduleDate, setScheduleDate] = useState<Date>();
  const [dueDate, setDueDate] = useState<Date>();
  const [asignee, setAsignee] = useState(employee[0].id);
  const [priority, setPriority] = useState("normal");
  const [notes, setNotes] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); //For closing popover once data is selected
  const [isDPopoverOpen, setIsDPopoverOpen] = useState(false); //For closing popover once data is selected
  const [disable, setDisable] = useState(false);
  const handleValueChange = (value: string) => {
    const selected = vendors.find((vendor) => vendor.name === value);
    if (selected) {
      setVendorId(selected.id);
    }
  };
  const empValueChange = (value: string) => {
    const selected = employee.find((employee) => employee.name === value);
    if (selected) {
      setAsignee(selected.id);
    }
  };
  const handleTextareaChange = (event: any) => {
    setNotes(event.target.value);
  };
  const handleSchDateSelect = (date: Date | undefined) => {
    //To handle popover for sch. date
    setScheduleDate(date);
    setIsPopoverOpen(false); // Hide the Popover once a date is selected
  };
  const handleDueDateSelect = (date: Date | undefined) => {
    //To handle popover for due. date
    setDueDate(date);
    setIsDPopoverOpen(false); // Hide the Popover once a date is selected
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Logic to add the equipment to records
    if (!dueDate) setDueDate(new Date());
    if (!equipId) {
      alert("Equipment Name Required");
      return;
    }
    if (!taskId) {
      alert("Task Required");
      return;
    }

    const mydata = {
      equipmentid: equipId,
      taskid: taskId,
      scheduledate: scheduleDate,
      duedate: dueDate,
      assignee: asignee,
      vendorid: vendorId,
      priority: priority,
      notes: notes,
      username: username,
    };

    try {
      const response = await fetch(`${apipath}workorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer pmis",
        },
        body: JSON.stringify(mydata),
      });

      if (response.ok) {
        alert("Record Updated Successfully!"), setIsOpen(false);
      } else alert("Failed to Enter Data!!");
      //  alert(result);
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Equipment Details:
            </label>
            <input
              type="text"
              value={equipDetails}
              onChange={(e) => setEquipmentId(parseInt(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Task:
            </label>
            <input
              type="text"
              value={taskname}
              onChange={(e) => setEquipmentId(parseInt(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Schedule Date:
            </label>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !scheduleDate && "text-muted-foreground"
                  )}
                  onClick={() => setIsPopoverOpen(true)} // Show the Popover when the button is clicked
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {scheduleDate ? (
                    format(scheduleDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={scheduleDate}
                  onSelect={handleSchDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Due Date:
            </label>
            <Popover open={isDPopoverOpen} onOpenChange={setIsDPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !dueDate && "text-muted-foreground"
                  )}
                  onClick={() => setIsDPopoverOpen(true)} // Show the Popover when the button is clicked
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={handleDueDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Vendor Name
            </label>
            <div className="flex items-center">
              <Select onValueChange={handleValueChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Vendor</SelectLabel>
                    {vendors.map((vendor, index) => (
                      <SelectItem key={index} value={vendor.name}>
                        {vendor.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Employee Name
            </label>

            <div className="flex items-center">
              <Select onValueChange={empValueChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select asignee " />
                </SelectTrigger>
                <SelectContent className="text-gray-800">
                  <SelectGroup>
                    <SelectLabel>Assignee</SelectLabel>
                    {employee.map((emp, index) => (
                      <SelectItem key={index} value={emp.name}>
                        {emp.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <ToggleGroup
              type="single"
              variant="outline"
              value={priority}
              onValueChange={(value) => {
                if (value) setPriority(value);
              }}
            >
              <ToggleGroupItem value="high" aria-label="high">
                High
              </ToggleGroupItem>
              <ToggleGroupItem value="normal" aria-label="normal">
                Normal
              </ToggleGroupItem>
              <ToggleGroupItem value="low" aria-label="low">
                Low
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>

            <Textarea
              placeholder="Type your Notes here."
              value={notes}
              onChange={handleTextareaChange}
              className="w-full h-32 p-2 border rounded"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
              disabled={disable}
            >
              Add to Records
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
