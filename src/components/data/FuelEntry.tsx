import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { vendorList } from "@/lib/zod";
import UserName from "../UserName";
const FuelEntry = ({
  equipid,
  equipname,
  employee,
  setIsOpen,
  apipath,
  username,
}: {
  equipid: number;
  equipname: string;
  employee: vendorList;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  apipath: string;
  username: string;
}) => {
  const [fuelDate, setFuelDate] = useState<Date>();
  const [fuel, setFuel] = useState(0);
  const [asignee, setAsignee] = useState(employee[0].id);
  const [priorMiles, setPriorMiles] = useState(0);
  const [currentMiles, setCurrentMiles] = useState(0);
  const [runningHours, setRunningHours] = useState(0);
  const [disable, setDisable] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); //For closing popover once data is selected
  const handleSubmit = async (e: any) => {
    if (!fuelDate) {
      alert("Fuel Date Required");
      return;
    }
    if (currentMiles == 0 && runningHours == 0) {
      alert("Current Milage or Running Hours Required");
      return;
    }
    const mydata = {
      equipmentid: equipid,
      fuel: fuel,
      fueldate: fuelDate,
      lastmilage: priorMiles,
      currentmilage: currentMiles,
      operatorname: asignee,
      runninghour: runningHours,
      username: username,
    };
    console.log(mydata);
    try {
      const response = await fetch(`${apipath}fuelentry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer pmis",
        },
        body: JSON.stringify(mydata),
      });

      if (response.ok) {
        alert("Record Updated Successfully!"), setIsOpen(false);
      } else {
        alert("Failed to Enter Data!!");
      }
      //  alert(result);
    } catch (e: any) {
      console.log(e);
    }
  };
  const handleFuelDateSelect = (date: Date | undefined) => {
    //To handle popover for sch. date
    setFuelDate(date);
    setIsPopoverOpen(false); // Hide the Popover once a date is selected
  };
  const empValueChange = (value: string) => {
    const selected = employee.find((employee) => employee.name === value);
    if (selected) {
      setAsignee(selected.id);
    }
  };
  return (
    <>
      <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-blue-600 text-lg font-extrabold">{equipname}</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-1">
            <div className="mb-2 flex space x-4">
              <label className="block text-sm font-medium text-gray-700">
                Fueled On
              </label>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !fuelDate && "text-muted-foreground"
                    )}
                    onClick={() => setIsPopoverOpen(true)} // Show the Popover when the button is clicked
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fuelDate ? (
                      format(fuelDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={fuelDate}
                    onSelect={handleFuelDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="mb-2 flex space x-4">
              <label className="block text-sm font-medium text-gray-700 ">
                Fuel:
              </label>
              <input
                type="text"
                value={fuel}
                onChange={(e) => setFuel(parseInt(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <label className="block text-sm font-medium text-gray-700">
                Ltrs
              </label>
            </div>
            <div className="mb-2 flex space x-4">
              <label className="block text-sm font-medium text-gray-700 ">
                Prior Miles:
              </label>
              <input
                type="text"
                value={priorMiles}
                onChange={(e) => setPriorMiles(parseInt(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-2 flex space x-4">
              <label className="block text-sm font-medium text-gray-700 ">
                Current Miles:
              </label>
              <input
                type="text"
                value={currentMiles}
                onChange={(e) => setCurrentMiles(parseInt(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-2 flex space x-4">
              <label className="block text-sm font-medium text-gray-700 ">
                Current Miles:
              </label>
              <input
                type="text"
                value={currentMiles}
                onChange={(e) => setCurrentMiles(parseInt(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-2 flex space x-4">
              <label className="block text-sm font-medium text-gray-700 ">
                Running Hours:
              </label>
              <input
                type="text"
                value={runningHours}
                onChange={(e) => setRunningHours(parseInt(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Operator
              </label>

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
    </>
  );
};
export default FuelEntry;
