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
  const [fuel, setFuel] = useState(0.0);
  const [price, setPrice] = useState(0.0);
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
    if (priorMiles == 0 && runningHours == 0) {
      alert("KM Run or Running Hours Required");
      return;
    }
    if (fuel==0){
      alert("Fuel Needs to be entered")
    }
    const mydata = {
      equipmentid: equipid,
      fuel: fuel,
      fueldate: fuelDate,
      lastmilage: priorMiles,
      currentmilage: currentMiles,
      operatorname: asignee,
      runninghour: runningHours,
      price:price,
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
        const errorData = await response.json(); // Parse the JSON error response
        const errorMessage = errorData.message  || "Unknown error";
        alert(`Error Inserting Date:${errorMessage}`);
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
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-blue-600 text-xl font-extrabold mb-6 text-center">
          {equipname}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Fueled On
              </label>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !fuelDate && "text-muted-foreground"
                    )}
                    onClick={() => setIsPopoverOpen(true)}
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

            <div className="flex flex-col space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Fuel (Liters)
              </label>
              <input
                type="text"
                value={fuel}
                onChange={(e) => setFuel(parseFloat(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Km (Run)
              </label>
              <input
                type="text"
                value={priorMiles}
                onChange={(e) => setPriorMiles(parseInt(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Current Miles
              </label>
              <input
                type="text"
                value={currentMiles}
                onChange={(e) => setCurrentMiles(parseInt(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Running Hours
              </label>
              <input
                type="text"
                value={runningHours}
                onChange={(e) => setRunningHours(parseInt(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Operator
              </label>
              <Select onValueChange={empValueChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Assignee" />
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
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
