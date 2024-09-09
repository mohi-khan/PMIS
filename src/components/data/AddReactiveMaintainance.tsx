import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
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
import { vendorList } from "@/lib/zod";
import SpareSelector from "../tools/SpareSelector";
import AttachmentViewer from "../tools/AttachmentViewer";

interface spareType {
  code: number;
  name: string;
  qty: number;
} ///For Storing Spare Parts
interface spareList {
  code: number;
  name: string;
}
interface MaintenanceFormData {
  equipmentid: number;
  datereported: Date;
  dateofmaintenance: Date;
  problemdescription: string;
  reportedby: string;
  assignedtechnician: string;
  prioritylevel: string;
  maintenancetype: string;
  workperformed: string;
  partsused: spareType[];
  laborhours: number;
  costofparts: number;
  status: string;
  completiondate: Date;
  comments: string;
  attachments: string[];
  preventivemeasures: string;
  vendorinformation: string;
}

const AddReactiveMaintenance = ({
  equipmentno,
  equipmentdesc,
  employee,
  username,
  setIsOpen,
}: {
  equipmentno: number;
  equipmentdesc: string;
  employee: vendorList;
  username: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [formData, setFormData] = useState<MaintenanceFormData>({
    equipmentid: equipmentno,
    datereported: new Date(),
    dateofmaintenance: new Date(),
    problemdescription: "",
    reportedby: "",
    assignedtechnician: "",
    prioritylevel: "Low",
    maintenancetype: "Repair",
    workperformed: "",
    partsused: [],
    laborhours: 0,
    costofparts: 0,
    status: "Pending",
    completiondate: new Date(),
    comments: "",
    attachments: [],
    preventivemeasures: "",
    vendorinformation: "",
  });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); //For closing popover once data is selected -Schedule Date
  const [isMPopoverOpen, setIsMPopoverOpen] = useState(false); //For closing popover once data is selected - Maintainance Date
  const [isCPopoverOpen, setIsCPopoverOpen] = useState(false); //For closing popover once data is selected - Completion Date
  const [spareList, setSpareList] = useState<spareList[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const apipath = process.env.NEXT_PUBLIC_API_PATH;
  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  const handleSpareListChange = (updatedSpareList: spareType[]) => {
    setFormData({
      ...formData,
      partsused: updatedSpareList,
    });
  };
  const fetchSparelist = async () => {
    try {
      const response = await fetch(`${apipath}spare/${equipmentno}`, {
        cache: "no-store",
      });
      const result = await response.json();
      //alert(result);
      const formattedResult = result.map(
        (item: { partid: number; partname: string }) => ({
          code: item.partid,
          name: item.partname,
        })
      );

      setSpareList(formattedResult);
    } catch (e) {
      console.log("Error on getting Spare List", e);
    }
  };
  fetchSparelist();

  const handledatereported = (date: Date | undefined) => {
    //To handle popover for sch. date
    let data = {};
    setFormData({
      ...formData,
      datereported: date ? date : new Date(),
    });
    setIsPopoverOpen(false); // Hide the Popover once a date is selected
  };
  const handleDateOfMaintenance = (date: Date | undefined) => {
    //To handle popover for sch. date
    setFormData({
      ...formData,
      dateofmaintenance: date ? date : new Date(),
    });
    setIsPopoverOpen(false); // Hide the Popover once a date is selected
  };
  const handleCompletionDate = (date: Date | undefined) => {
    //To handle popover for sch. date
    setFormData({
      ...formData,
      completiondate: date ? date : new Date(),
    });
    setIsCPopoverOpen(false); // Hide the Popover once a date is selected
  };
  const repValueChange = (value: string) => {
    const selected = employee.find((employee) => employee.name === value);
    if (selected) {
      setFormData({
        ...formData,
        reportedby: selected.id,
      });
    }
  };
  const assTechChange = (value: string) => {
    const selected = employee.find((employee) => employee.name === value);
    if (selected) {
      setFormData({
        ...formData,
        assignedtechnician: selected.id,
      });
    }
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data = [];
    const updatedfiles = new FormData();
    for (const file of files) {
      updatedfiles.append("files", file);
    }

    try {
      const response = await fetch(`${apipath}upload`, {
        method: "POST",
        body: updatedfiles,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      data = result;
      console.log(data);
      console.log(Array.isArray(data));
    } catch (e) {
      console.log("Record Update Failed!", e);
      return;
    }
    const payload = {
      equipmentid: equipmentno,
      datereported: new Date(),
      dateofmaintenance: new Date(),
      problemdescription: formData.problemdescription,
      reportedby: formData.reportedby,
      assignedtechnician: formData.assignedtechnician,
      prioritylevel: formData.prioritylevel,
      maintenancetype: formData.maintenancetype,
      workperformed: formData.workperformed,
      partsused: formData.partsused,
      laborhours: formData.laborhours,
      costofparts: formData.costofparts,
      status: "Pending",
      completiondate: formData.completiondate,
      comments: formData.comments,
      attachments: data,
      preventivemeasures: formData.preventivemeasures,
      vendorinformation: formData.vendorinformation,
      username: username,
    };
    try {
      const response = await fetch(`${apipath}reactivemaintenance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer pmis",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        alert("Record Updated Successfully!"), setIsOpen(false);
      } else alert("Failed to Enter Data!!");
    } catch (e: any) {
      console.log(e);
    }
    setFormData({
      equipmentid: equipmentno,
      datereported: new Date(),
      dateofmaintenance: new Date(),
      problemdescription: "",
      reportedby: "",
      assignedtechnician: "",
      prioritylevel: "Low",
      maintenancetype: "Repair",
      workperformed: "",
      partsused: [],
      laborhours: 0,
      costofparts: 0,
      status: "Pending",
      completiondate: new Date(),
      comments: "",
      attachments: [],
      preventivemeasures: "",
      vendorinformation: "",
    });
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-blue-600 text-lg font-extrabold">{equipmentdesc}</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-1">
          <div className="mb-2 flex space x-4">
            <label>
              Reported Date:
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[180px] justify-start text-left font-normal",
                      !formData.datereported && "text-muted-foreground"
                    )}
                    onClick={() => setIsPopoverOpen(true)} // Show the Popover when the button is clicked
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.datereported ? (
                      format(formData.datereported, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.datereported}
                    onSelect={handledatereported}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </label>

            <label>
              Maintenance Date:
              <Popover open={isMPopoverOpen} onOpenChange={setIsMPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[180px] justify-start text-left font-normal",
                      !formData.dateofmaintenance && "text-muted-foreground"
                    )}
                    onClick={() => setIsPopoverOpen(true)} // Show the Popover when the button is clicked
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dateofmaintenance ? (
                      format(formData.dateofmaintenance, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dateofmaintenance}
                    onSelect={handleDateOfMaintenance}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </label>
          </div>
        </div>

        <label className="mb-1">
          Problem Description:
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            name="problemdescription"
            value={formData.problemdescription}
            onChange={handleChange}
            required
          />
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-1">
          <div className="mb-2 flex space x-4">
            <label className="mr-12">
              Reported By:
              <Select onValueChange={repValueChange}>
                <SelectTrigger className="w-[180px] h-[25px]">
                  <SelectValue placeholder="Select Reported by " />
                </SelectTrigger>
                <SelectContent className="text-gray-800">
                  <SelectGroup>
                    <SelectLabel>Reported by</SelectLabel>
                    {employee.map((emp, index) => (
                      <SelectItem key={index} value={emp.name}>
                        {emp.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </label>
            <label>
              Assigned Technician:
              <Select onValueChange={assTechChange}>
                <SelectTrigger className="w-[180px] h-[25px]">
                  <SelectValue placeholder="Select Reported by " />
                </SelectTrigger>
                <SelectContent className="text-gray-800">
                  <SelectGroup>
                    <SelectLabel>Assign Technician</SelectLabel>
                    {employee.map((emp, index) => (
                      <SelectItem key={index} value={emp.name}>
                        {emp.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </label>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-1">
          <div className="mb-2 flex space x-4">
            <label className="mr-6">
              Priority Level:
              <select
                name="prioritylevel"
                value={formData.prioritylevel}
                onChange={handleChange}
                required
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </label>
            <label>
              Maintenance Type:
              <select
                name="maintenancetype"
                value={formData.maintenancetype}
                onChange={handleChange}
                required
              >
                <option value="Repair">Repair</option>
                <option value="Replace">Replace</option>
                <option value="Inspection">Inspection</option>
              </select>
            </label>
          </div>
        </div>
        <label className="mb-1">
          Work Description:
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            name="workperformed"
            value={formData.workperformed}
            onChange={handleChange}
            required
          />
        </label>
        <div className="mb-2 flex space x-4">
          <label>
            Parts Used:
            <SpareSelector
              spareList={spareList}
              onSpareListChange={handleSpareListChange}
            />
          </label>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-1">
          <div className="mb-2 flex space x-4">
            <label>
              Labor Hours:
              <input
                type="number"
                name="laborhours"
                value={formData.laborhours}
                onChange={handleChange}
              />
            </label>
            <label>
              Cost of Parts:
              <input
                type="number"
                name="costofparts"
                value={formData.costofparts}
                onChange={handleChange}
              />
            </label>
            <label>
              Status:
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </label>
          </div>
        </div>
        <div className="mb-2 flex space x-4">
          <label>
            Completion Date:
            <Popover open={isCPopoverOpen} onOpenChange={setIsCPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[180px] justify-start text-left font-normal",
                    !formData.completiondate && "text-muted-foreground"
                  )}
                  onClick={() => setIsCPopoverOpen(true)} // Show the Popover when the button is clicked
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.completiondate ? (
                    format(formData.completiondate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.completiondate}
                  onSelect={handleCompletionDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </label>
        </div>
        <div className="mb-2 flex space x-4">
          <label>
            Preventive Measures:
            <textarea
              name="preventivemeasures"
              value={formData.preventivemeasures}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
        </div>
        <div className="mb-2 flex space x-4">
          <label>
            Comments:
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
        </div>
        <div className="mb-2 flex flex-col items-start space-x-4">
          <label className="mb-1">
            Vendor Information:
            <textarea
              name="vendorinformation"
              value={formData.vendorinformation}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
        </div>
        <AttachmentViewer onFilesChange={handleFilesChange} />
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
            disabled={false}
          >
            Add to Records
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReactiveMaintenance;
