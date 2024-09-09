"use client";
import { vendorList } from "@/lib/zod";
import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
export default function EquipmentAdd({
  manufacturers,
  vendors,
  setIsOpen,
  username,
}: {
  manufacturers: string[];
  vendors: vendorList;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
}) {
  const apipath = process.env.NEXT_PUBLIC_API_PATH;
  const [equipname, setEquipmentName] = useState("");
  const [manufacuturData, setManufacturerData] = useState(manufacturers);
  const [manufacturer, setManufacturer] = useState(manufacuturData[0]);
  const [vendorData, setVendorData] = useState(vendors);
  const [vendorName, setVendorName] = useState(vendorData[0].id);
  const [model, setModel] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [runningHours, setRunningHours] = useState(0);
  const [meter, setMeter] = useState(0);
  const [newManufactururName, setNewManufactururName] = useState("");
  const [newVednorName, setNewVendorName] = useState("");
  const [newTel, setNewTel] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [disable, setDisable] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false); //For Popover on Vendor
  const [mpopoverOpen, setMpopoverOpen] = useState(false); //For Popover on Manufactur
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Logic to add the equipment to records
    if (!purchaseDate) setPurchaseDate("1900/01/01");
    if (!equipname) {
      alert("Equipment Name Required");
      return;
    }
    if (!model) {
      alert("Model Required");
      return;
    }
    if (!serialNo) {
      alert("Serial No Required");
      return;
    }
    const mydata = {
      equipname: equipname,
      manufactur: manufacturer,
      model: model,
      slno: serialNo,
      vendorid: vendorName,
      purdate: purchaseDate,
      runninghour: runningHours,
      milagemeter: meter,
      username: username,
    };

    try {
      const response = await fetch(`${apipath}equipment`, {
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
  const handleAddVendor = async (e: any) => {
    //Insert New Vendor Record and Add this on your select box
    e.preventDefault();
    if (!newVednorName) {
      alert("Vendor Name Required");
      return;
    }
    interface returnvendor {
      id: string;
      name: string;
    }
    const vendordata = {
      name: newVednorName,
      telno: newTel,
      address: newAddress,
      username: username,
    };
    try {
      const response = await fetch(`${apipath}vendor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer pmis",
        },
        body: JSON.stringify(vendordata),
      });
      if (response.ok) {
        const result = await response.json();
        const newRow: returnvendor = {
          id: result.data[0].vendorid,
          name: result.data[0].vendorname,
        };
        alert(`Record Updated Successfully!new Vendor Id:${newRow.id}`);
        setVendorData([...vendorData, newRow]);
        setNewVendorName("");
        setNewTel("");
        setNewAddress("");
        setVendorName(newRow.name);
        setPopoverOpen(false);
      } else alert("Failed to Enter Data!!");
    } catch (e: any) {
      console.log(e);
    }
  };
  const handleAddManufacturur = async (e: any) => {
    e.preventDefault();
    if (!newManufactururName) {
      alert("Manufacturur Name Required");
      return;
    }
    setManufacturerData([...manufacuturData, newManufactururName]);
    setNewManufactururName("");
    setManufacturer(newManufactururName);
    setMpopoverOpen(false);
  };
  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Equipment Name
            </label>
            <input
              type="text"
              value={equipname}
              onChange={(e) => setEquipmentName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Manufacturer
            </label>
            <div className="flex items-center">
              <select
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {manufacuturData.map((man, index) => (
                  <option key={index} value={man}>
                    {man}
                  </option>
                ))}
              </select>
              <Popover open={mpopoverOpen} onOpenChange={setMpopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="ml-2 px-2 py-2 bg-blue-500 text-white text-xs rounded-md"
                  >
                    ...
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="mb-1">
                    <input
                      type="text"
                      id="ManName"
                      placeholder="Enter Manufactur Name"
                      value={newManufactururName}
                      onChange={(e) => setNewManufactururName(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={handleAddManufacturur}
                    className="ml-2 px-2 py-2 bg-blue-500 text-white text-xs rounded-md"
                  >
                    Add
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Vendor Name
            </label>
            <div className="flex items-center">
              <select
                value={vendorName}
                onChange={(e) => {
                  //alert(e.target.value)
                  setVendorName(e.target.value);
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {vendorData.map((vendor, index) => (
                  <option key={index} value={vendor.id}>
                    {vendor.name}
                  </option>
                ))}
              </select>
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="ml-2 px-2 py-2 bg-blue-500 text-white text-xs rounded-md"
                  >
                    ...
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="mb-1">
                    <input
                      type="text"
                      id="VendorName"
                      placeholder="Enter Vendor Name"
                      value={newVednorName}
                      onChange={(e) => setNewVendorName(e.target.value)}
                    />
                    <input
                      type="text"
                      id="newtel"
                      value={newTel}
                      placeholder="Enter Telephone Number"
                      onChange={(e) => setNewTel(e.target.value)}
                    />
                    <input
                      type="text area"
                      id="newaddress"
                      placeholder="Enter Address"
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={handleAddVendor}
                    className="ml-2 px-2 py-2 bg-blue-500 text-white text-xs rounded-md"
                  >
                    Add
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Model
            </label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Serial No
            </label>
            <input
              type="text"
              value={serialNo}
              onChange={(e) => setSerialNo(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Purchase Date
            </label>
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Meter
            </label>
            <input
              type="text"
              value={meter}
              onChange={(e) => setMeter(parseInt(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
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
      </form>
    </div>
  );
}
