"use client";
import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

interface EquipmentDetails {
  name: string;
  model: string;
  serialNumber: string;
}

interface Spare {
  code: number;
  name: string;
  qty?: number;
}
interface WorkorderDetails {
 
  taskname: string;
  completedate: string | undefined;
  workorderid: number;
  techname: string;
  position: string;
  tel: string;
  problem: string;
  spares?: Spare[] | null;
  procedure?: string | null;
  observation?: string | null;
  attachment?: string[];
}
interface Fuelhistory{
    equipmentid: number,
    equipmentname: string,
    model: string,
    milagemeter: number,
    runninghours: number,
    fuelconsumed: number,
    date: string,
    mileage_per_liter: number|null,
    running_hours_per_liter: number|null
}
interface ReportHeaderProps {
  reactMainDetails: WorkorderDetails[];
  workorderDetails:WorkorderDetails[];
  equipmentDetails: EquipmentDetails;
  fuelhistory:Fuelhistory[];
  reporttype: string;
}

const EquipmentHistory: React.FC<ReportHeaderProps> = ({
  reactMainDetails,
  workorderDetails,
  equipmentDetails,
  fuelhistory,
  reporttype,
}) => {
  const slideRef = useRef(null);
  const handleDownloadPDF = () => {
    // Specify the element to convert to PDF
    const element = document.getElementById("procedure-content");
    // Configure options
    const options = {
      margin: 1,
      filename: "procedure.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().from(element).set(options).save();
  };
  return (
    <>
      <div className="p-6 bg-white shadow-md rounded-md" id="procedure-content">
        <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Equipment History Reports
        </h1>
     
        <div>
          <span className="font-bold text-gray-600 text-lg">
            Equipment Details:{" "}
          </span>
        </div>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-bold">
                Equipment Name
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-bold">
                Model
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-bold">
                Serial Number
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                {equipmentDetails.name}
              </td>
              <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                {equipmentDetails.model}
              </td>
              <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                {equipmentDetails.serialNumber}
              </td>
            </tr>
          </tbody>
        </table>
    
    
        {/* Reactive Maintenance History Section */}
        <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">
          Reactive Maintenance History
        </h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-bold">
                Task Name
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-bold">
                Complete Date
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-bold">
                Technician Name
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-bold">
                Position
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-bold">
                Telephone
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-bold">
                Problem
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-bold">
                Procedure
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-bold">
                Observation
              </th>
            </tr>
          </thead>
          <tbody>
            {reactMainDetails.map((workorder, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                  {workorder.taskname}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                  {workorder.completedate || "N/A"}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                  {workorder.techname}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                  {workorder.position}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                  {workorder.tel}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                  {workorder.problem}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                  {workorder.procedure || "N/A"}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                  {workorder.observation || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

    {/* Workorder History Section */}
    <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">
          Work Order History
        </h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-bold">
                Task Name
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-bold">
                Complete Date
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-bold">
                Technician Name
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-bold">
                Position
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-bold">
                Telephone
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-bold">
                Problem
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-bold">
                Procedure
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-bold">
                Observation
              </th>
            </tr>
          </thead>
          <tbody>
            {workorderDetails.map((workorder, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                  {workorder.taskname}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                  {workorder.completedate || "N/A"}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                  {workorder.techname}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                  {workorder.position}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                  {workorder.tel}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                  {workorder.problem}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                  {workorder.procedure || "N/A"}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                  {workorder.observation || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  {/* Fuel History Section */}
  <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">
          Fuel History
        </h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-bold">
                Consumption Date
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-bold">
                Fuel Consumtion (Litre)
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-bold">
                Milage Meter
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-bold">
                Running Hours
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-bold">
                Milage Per Liter
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-bold">
                Running Hours Per Leter
              </th>
              
            </tr>
          </thead>
          <tbody>
            {fuelhistory.map((fuel, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                  {fuel.date}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                  {fuel.fuelconsumed}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                  {fuel.milagemeter}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                  {fuel.runninghours}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                  {fuel.mileage_per_liter}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                  {fuel.running_hours_per_liter}
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>


      </div>
      <button
        onClick={handleDownloadPDF}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Download as PDF
      </button>
    </>
  );
};

export default EquipmentHistory;
