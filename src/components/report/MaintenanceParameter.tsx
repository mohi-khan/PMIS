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
interface Equipment {
  id: number;
  desc: string;
}

const MaintenanceParameter: React.FC = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<number | null>(
    null
  );
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isEPopoverOpen, setIsEPopoverOpen] = useState(false);
  const [fdate, setFdate] = useState(new Date());
  const [edate, setEdate] = useState(new Date());
  useEffect(() => {
    // Fetch equipment data from API
    fetch(`${process.env.NEXT_PUBLIC_API_PATH}equipmentMasterList`)
      .then((res) => res.json())
      .then((data) => setEquipment(data));
  }, []);
  function offsetDate(date: Date): Date {
    const timezoneOffset = date.getTimezoneOffset();
    // Subtract the offset to adjust to UTC
    date.setMinutes(date.getMinutes() - timezoneOffset);
    return date;
  }
  const handlefdate = (date: Date | undefined) => {
    if (date) {
      const mydate = offsetDate(date);
      setFdate(mydate);
    }
    setIsPopoverOpen(false);
  };
  const handleedate = (date: Date | undefined) => {
    if (date) {
      const mydate = offsetDate(date);
      setEdate(mydate);
    }
    setIsEPopoverOpen(false);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fdateforApi = fdate.toISOString().slice(0, 10);
    const edateforApi = edate.toISOString().slice(0, 10);
    window.location.href = `/others/reports/euiphistory/${selectedEquipment}/${fdateforApi}/${edateforApi}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="equipment"
          className="block text-sm font-medium text-gray-700"
        >
          Equipment
        </label>
        <select
          id="equipment"
          value={selectedEquipment || ""}
          onChange={(e) => setSelectedEquipment(Number(e.target.value))}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="" disabled>
            Select Equipment
          </option>
          {equipment.map((eq) => (
            <option key={eq.id} value={eq.id}>
              {`${eq.desc}`}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="fdate"
          className="block text-sm font-medium text-gray-700"
        >
          From Date
        </label>
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[180px] justify-start text-left font-normal",
                fdate && "text-muted-foreground"
              )}
              onClick={() => setIsPopoverOpen(true)} // Show the Popover when the button is clicked
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {fdate ? format(fdate, "yyyy-MMM-dd") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={fdate}
              onSelect={handlefdate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <label
          htmlFor="edate"
          className="block text-sm font-medium text-gray-700"
        >
          End Date
        </label>
        <Popover open={isEPopoverOpen} onOpenChange={setIsEPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[180px] justify-start text-left font-normal",
                fdate && "text-muted-foreground"
              )}
              onClick={() => setIsEPopoverOpen(true)} // Show the Popover when the button is clicked
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {edate ? format(edate, "yyyy-MMM-dd") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={edate}
              onSelect={handleedate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm"
      >
        Show Report
      </button>
    </form>
  );
};

export default MaintenanceParameter;
