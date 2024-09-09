"use client";
import React, { useState, useEffect } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface EquipmentUpdateFormProps {
  equipmentId: number;
  equipmentDescription: string;
  username: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MilageUpdateForm: React.FC<EquipmentUpdateFormProps> = ({
  equipmentId,
  equipmentDescription,
  username,
  setIsOpen,
}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [myDate, setMyDate] = useState("");
  const [milage, setMilage] = useState<number>(0.0);
  const [runningHours, setRunningHours] = useState<number>(0);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [fuelConsumed, setFuelConsumed] = useState(0.0);
  const [fuelUnit, setFuelUnit] = useState("Litre");
  const handledatereported = (mydate: Date | undefined) => {
    if (mydate) {
      console.log("ISO Date", mydate.toISOString());
      const timezoneOffset = mydate.getTimezoneOffset();

      // Subtract the offset to adjust to UTC
      mydate.setMinutes(mydate.getMinutes() - timezoneOffset);
      setDate(mydate);
      setMyDate(mydate.toISOString().split("T")[0]);
    } else {
      setDate(new Date());
    }

    setIsPopoverOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    const apipath = process.env.NEXT_PUBLIC_API_PATH;
    event.preventDefault();
    const mydata = {
      equipmentid: equipmentId,
      milagemeter: milage,
      runninghours: runningHours,
      date: myDate,
      fuelconsumed: fuelConsumed,
      fuelunit: fuelUnit,
    };

    try {
      const response = await fetch(`${apipath}milage`, {
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
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Equipment Description
        </label>
        <input
          type="text"
          value={equipmentDescription}
          readOnly
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[180px] justify-start text-left font-normal",
                date && "text-muted-foreground"
              )}
              onClick={() => setIsPopoverOpen(true)} // Show the Popover when the button is clicked
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "yyyy/MM/dd") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handledatereported}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Milage (KM run Today)
        </label>
        <input
          type="number"
          value={milage}
          onChange={(e) => setMilage(parseInt(e.target.value, 10))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Running Hours (Run today)
        </label>
        <input
          type="number"
          value={runningHours}
          onChange={(e) => setRunningHours(parseFloat(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Fuel Consumed
        </label>
        <input
          type="number"
          value={fuelConsumed}
          onChange={(e) => setFuelConsumed(parseFloat(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <label className="block text-sm font-medium text-gray-700">
          {fuelUnit}
        </label>
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default MilageUpdateForm;
