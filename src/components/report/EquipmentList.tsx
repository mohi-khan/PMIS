"use client";
import html2pdf from "html2pdf.js";
import { DataTable } from "@/components/tools/DataTable";
import { equipment } from "@/components/data/columns/equipment";
import { equipments } from "@/lib/zod";

interface ReportHeaderProps {
    equipmentdetails: equipments[];
    reporttype: string;
  }
const EquipmentList: React.FC<ReportHeaderProps> = ({
    equipmentdetails,
    reporttype,
  }) => {
    const handleDownloadPDF = () => {
        // Specify the element to convert to PDF
        const element = document.getElementById("procedure-content");
        // Configure options
        const options = {
          margin: 1,
          filename: "Equipment.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
        };
        html2pdf().from(element).set(options).save();
      };
    return(
        <>
        <div className="text-center py-8" id="procedure-content">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Equipment List</h1>
    
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">
            Equipment List
          </h2>
    
          
          <div className="container mx-auto py-10">
            <DataTable columns={equipment} data={equipmentdetails} />
          </div>
        </div>
        <button
            onClick={handleDownloadPDF}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Download as PDF
          </button>
        </>
      
    )

}

export default EquipmentList