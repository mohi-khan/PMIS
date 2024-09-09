"use client";
import { useState } from "react";
import EquipmentAdd from "@/components/data/EqupmentAdd";

import { vendorList } from "@/lib/zod";
import { ResponsiveDialog } from "../dialogui/Dialogui";
export default function EquipAddComp({
  manufacturers,
  vendors,
  equipmentno,
  username,
}: {
  manufacturers: string[];
  vendors: vendorList;
  equipmentno: number;
  username: string;
}) {
  const apipath = process.env.NEXT_PUBLIC_API_PATH;
  const [isOpen, setIsOpen] = useState(false); //For Responsive Dialog
  return (
    <table className="w-full">
      <tbody>
        <tr>
          <td className="w-[70%]">
            <h1 className="text-xl text-black">{`Equipments(${equipmentno})`}</h1>
          </td>
          <td className="text-right">
            <ResponsiveDialog
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              title="Add new Equipment"
            >
              <EquipmentAdd
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
              className="inline-flex justify-start rounded-md p-2 border-2 border-black bg-black text-white transition-all duration-75 hover:bg-neutral-800 hover:border-neutral-800"
            >
              Add New Equipment
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
