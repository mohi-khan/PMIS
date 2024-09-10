"use client";
import React from "react";
import { useState } from "react";

import { PartType } from "../../lib/zod";
import { ResponsiveDialog } from "../dialogui/Dialogui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { Button } from "../ui/button";
export const paginate = (
  spareparts: PartType,
  pageNumber: number,
  pageSize: number
) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return spareparts.slice(startIndex, startIndex + pageSize);
};

export default function SpareList({ data }: { data: PartType }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  //const data:Item[] = await Items()
  const sliceddata: PartType = paginate(data, currentPage, pageSize);
  return (
    <>
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Add Spare Details"
      >
        <div></div>
      </ResponsiveDialog>

      <div className="table-auto w-full bg-white rounded-lg overflow-hidden shadow-md">
        <table className="table-auto w-full bg-white rounded-lg overflow-hidden shadow-md ">
          <thead className="bg-white text-gray-900 dark:bg-white">
            <tr>
              <th className="py-2 px-4 font-sans text-base text-left">
                Part Name
              </th>
              <th className="py-2 px-4 font-sans text-base text-left">
                Equipment Description
              </th>

              <th className="py-2 px-4 font-sans text-base text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sliceddata.map((part, index) => (
              <tr key={index} className="bg-white text-gray-800">
                <td className="py-2 px-4 hover:bg-gray-200 text-sm">
                  {part.partname}
                </td>
                <td className="py-2 px-4 hover:{bg-gray-200 text-sm}">
                  {part.equipmentdesc}
                </td>

                <td className="py-2 px-4 text-sm">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button>
                        <IoIosArrowDropdownCircle />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuTrigger>
                      <DropdownMenuContent className="w-22">
                        <DropdownMenuLabel>
                          <button
                            onClick={() => {
                              setIsOpen(true);
                            }}
                            className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                          >
                            Add Spare
                          </button>
                        </DropdownMenuLabel>
                      </DropdownMenuContent>
                    </DropdownMenuTrigger>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
      </div>
    </>
  );
}
