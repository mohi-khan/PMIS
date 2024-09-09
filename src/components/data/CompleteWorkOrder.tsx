"use client";
import { useState } from "react";
import { DateTimePicker } from "@/components/ui/date-timepicker";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { equipmentlist, vendorList } from "@/lib/zod";
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
export default function WorkOrderComplete({
  workorderid,
  equipmentid,
  equipmentdata,
  username,
  setIsOpen,
}: {
  workorderid: number;
  equipmentid: number;
  equipmentdata: equipmentlist[];
  username: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  interface spareType {
    code: number;
    name: string;
    qty: number;
  } ///For Storing Spare Parts
  interface spareList {
    code: number;
    name: string;
  }
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [spareList, setSpareList] = useState<spareList[]>([]);
  const [usedSpare, setUsedSpare] = useState<spareType[]>([]);
  const [meter, setMeter] = useState(
    equipmentdata.find((equipment) => equipment.id === equipmentid)
      ?.milagemeter || 0
  );
  const [runningHours, setRunningHours] = useState(
    equipmentdata.find((equipment) => equipment.id === equipmentid)
      ?.runninghour || 0
  );
  const [totalCost, setTotalCost] = useState(0);
  const [notes, setNotes] = useState("");
  const [procedure, setProcedure] = useState("");
  const [observation, setObservation] = useState("");
  const [qty, setQty] = useState(0);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const apipath = process.env.NEXT_PUBLIC_API_PATH;
  const fetchSparelist = async () => {
    try {
      const response = await fetch(`${apipath}spare/${equipmentid}`, {
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
  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  const handleSpareListChange = (updatedSpareList: spareType[]) => {
    setUsedSpare(updatedSpareList);
  };

  const handleSubmit = async (e: any) => {
    let data = {};

    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }

    try {
      const response = await fetch(`${apipath}upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      data = result;
    } catch (e) {
      console.log("Record Update Failed!", e);
      return;
    }

    const payload = {
      workorderid: workorderid,
      status: "completed", // You can set this based on your logic
      workstarttime: startDate
        ? startDate.toISOString().split("T")[0]
        : undefined,
      workcompletiontime: endDate
        ? endDate.toISOString().split("T")[0]
        : undefined,
      spare: usedSpare,
      complitionnotes: notes,
      attachment: data,
      totalcost: totalCost,
      metervalue: meter,
      runninghour: runningHours,
      procedure: procedure,
      observation: observation,
      username: username,
    };
    try {
      const response = await fetch(`${apipath}update-workorder`, {
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
  };
  return (
    <>
      <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
        <form action={handleSubmit}>
          <div className="relative flex flex-col min-w-700 w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="relative w-full mb-3 col-2">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Work Start Time
              </label>
              <DateTimePicker
                placeholder="Pick Your Date and Time"
                hourCycle={12}
                value={startDate}
                onChange={setStartDate}
              />
            </div>
            <div className="relative w-full mb-3 col-2">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Work Complete Time
              </label>
              <DateTimePicker
                placeholder="Pick your Date and Time"
                hourCycle={12}
                value={endDate}
                onChange={setEndDate}
              />
            </div>

            <div className="relative w-full mb-3 col-2">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Meter Value
              </label>
              <input
                type="text"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Enter Running Hours"
                value={meter}
                onChange={(e) => {
                  setMeter(parseInt(e.target.value));
                }}
              />
            </div>
            <div className="relative w-full mb-3 col-2">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Running Hours
              </label>
              <input
                type="text"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Enter Running Hours"
                value={runningHours}
                onChange={(e) => {
                  setRunningHours(parseInt(e.target.value));
                }}
              />
            </div>
            <div className="relative w-full mb-3 col-2">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Total Cost
              </label>
              <input
                type="text"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Enter Total Cost"
                value={totalCost}
                onChange={(e) => {
                  setTotalCost(parseInt(e.target.value));
                }}
              />
            </div>
            <div className="relative w-full mb-3 col-2">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Notes
              </label>
              <input
                type="text Area"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Enter Notest"
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                }}
              />
            </div>
            <div className="relative w-full mb-3 col-2">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Procedures
              </label>
              <textarea
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Enter Procedures"
                value={procedure}
                onChange={(e) => {
                  setProcedure(e.target.value);
                }}
                rows={5}
              />
            </div>
            <div className="relative w-full mb-3 col-2">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Observation
              </label>
              <textarea
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Enter Observation"
                value={observation}
                onChange={(e) => {
                  setObservation(e.target.value);
                }}
                rows={5}
              />
            </div>
            <div className="mb-2 flex space x-4">
              <label>
                Parts Used:
                <SpareSelector
                  spareList={spareList}
                  onSpareListChange={handleSpareListChange}
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
          </div>
        </form>
      </div>
    </>
  );
}
