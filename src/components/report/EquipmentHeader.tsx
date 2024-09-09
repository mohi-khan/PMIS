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
interface ReportHeaderProps {
  workorderDetails: WorkorderDetails;
  equipmentDetails: EquipmentDetails;
  reporttype: string;
}

const EquipmentHeader: React.FC<ReportHeaderProps> = ({
  workorderDetails,
  equipmentDetails,
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
          Job Completion Report
        </h1>

        <div className="flex justify-between mb-6">
          <div>
            <span className="font-medium text-gray-600">
              Date of Completion:{" "}
            </span>
            <span className="text-gray-800">
              {workorderDetails.completedate}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-600">
              Workorder Number:{" "}
            </span>
            <span className="text-gray-800">
              {workorderDetails.workorderid}
            </span>
          </div>
        </div>
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
        <div>
          <span className="font-bold text-gray-600 text-lg">
            Technician Details:{" "}
          </span>
        </div>
        <div>
          <span className="font-bold text-gray-600">Name: </span>
          <span className="text-gray-800">{workorderDetails.techname}</span>
          <br />
          <span className="font-bold text-gray-600">Position: </span>
          <span className="text-gray-800">{workorderDetails.position}</span>
          <br />
          <span className="font-bold text-gray-600">Tel: </span>
          <span className="text-gray-800">{workorderDetails.tel}</span>
        </div>
        <div>
          <span className="font-bold text-gray-600 text-lg">
            Description of Work:
          </span>
        </div>
        <div>
          <span className="font-bold text-gray-600">Task Performed: </span>
          <span className="text-gray-800">{workorderDetails.taskname}</span>
          <br />
          <span className="font-bold text-gray-600">Service Type: </span>
          <span className="text-gray-800">{reporttype}</span>
          <br />
          <span className="font-bold text-gray-600">Current Condition: </span>
          <span className="text-gray-800">{workorderDetails.problem}</span>
          <br />
          <span className="font-bold text-gray-600">Spare Used: </span>
        </div>
        <div className="container mx-auto p-4">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Code</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(workorderDetails.spares) &&
              workorderDetails.spares.length > 0 ? (
                workorderDetails.spares.map((spare, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">{spare.code}</td>
                    <td className="px-4 py-2 border">{spare.name}</td>
                    <td className="px-4 py-2 border">
                      {spare.qty !== undefined ? spare.qty : 1}
                    </td>
                  </tr>
                ))
              ) : (
                <p>No Spares Used.</p>
              )}
            </tbody>
          </table>
        </div>
        <div>
          <span className="font-bold text-gray-600">Procedure: </span>
          <br />
          <span className="text-gray-800">
            {" "}
            <pre className="whitespace-pre-wrap">
              {workorderDetails.procedure}
            </pre>
          </span>
          <br />
        </div>
        <div>
          <span className="font-bold text-gray-600">observation: </span>
          <br />
          <span className="text-gray-800">
            {" "}
            <pre className="whitespace-pre-wrap">
              {workorderDetails.observation}
            </pre>
          </span>
          <br />
        </div>
        <div>
          <span className="font-bold text-gray-600">Attachments: </span>
          <br />
          <div>
            {Array.isArray(workorderDetails.attachment) &&
            workorderDetails.attachment.length > 0 ? (
              workorderDetails.attachment.map((attachment, index) => (
                <p key={index} className="my-2">
                  <a
                    href={`${process.env.NEXT_PUBLIC_API_PATH}download/${attachment}`}
                    download
                    className="text-blue-500 underline"
                  >
                    {attachment}
                  </a>
                </p>
              ))
            ) : (
              <p>No attachments available.</p>
            )}
          </div>
        </div>
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

export default EquipmentHeader;
