"use client";
import { useState } from "react";
import EquipmentAdd from "@/components/data/EqupmentAdd";

import { equipments, vendorList } from "@/lib/zod";
import { ResponsiveDialog } from "../dialogui/Dialogui";
import EquipmentEdit from "./EquipmentEdit";
export default function EquipEditComp({
  equipmentdata,
  manufacturers,
  vendors,
  username,
}: {
  equipmentdata: equipments;
  manufacturers: string[];
  vendors: vendorList;
  username: string;
}) {
  const apipath = process.env.NEXT_PUBLIC_API_PATH;
  const [isOpen, setIsOpen] = useState(false); //For Responsive Dialog
  return (
    <div className="flex justify-between  items-center w-full">
      <div className="flex justify-between items-center">
        <ResponsiveDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title="Edit Equipment"
        >
          <EquipmentEdit
            equipmentData={equipmentdata}
            manufacturers={manufacturers}
            vendors={vendors}
            setIsOpen={setIsOpen}
            username={username}
          />
        </ResponsiveDialog>
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className="w-full flex justify-start rounded-md p-2 border-2 border-black bg-black text-white transition-all duration-75 hover:bg-neutral-800 hover:border-neutral-800"
        >
          Edit Equipment
        </button>
      </div>
    </div>
  );
}
