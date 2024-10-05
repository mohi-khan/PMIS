"use client";
import { useState } from "react";
import Pagination from "../tools/pagination";
import { equipmentlist, OverdueType, TaskList, vendorList } from "@/lib/zod";
import Link from "next/link";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import EquipTask from "@/components/data/EqupTask";
import AddReactiveMaintenance from "@/components/data/AddReactiveMaintainance";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ResponsiveDialog } from "../dialogui/Dialogui";
import FuelEntry from "./FuelEntry";
import MilageUpdateForm from "./Milage";
import { Session } from "inspector";

export const paginate = (
  equipment: equipmentlist[],
  pageNumber: number,
  pageSize: number
) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return equipment.slice(startIndex, startIndex + pageSize);
};
interface equipmentProps {
  data: equipmentlist[];
}

const EquipmentList = ({
  data,
  tasklist,
  pendingtask,
  employee,
  apipath,
  username,
}: {
  data: equipmentlist[];
  tasklist: TaskList;
  pendingtask: OverdueType[];
  employee: vendorList;
  apipath: string;
  username: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false); //For Adding Task
  const [isFuelOpen, setIsFuelOpen] = useState(false); //For Adding Fuel
  const [isReactiveOpen, setIsReactiveOpen] = useState(false); //For Adding Reactive Maint.
  const [isMilageOpen, setIsMilageOpen] = useState(false); //For Adding Milage
  const [equipmentList,setEquipmentList]=useState(data);
  const [equipId, setEquipId] = useState(0);
  const [equipname, setEquipName] = useState("");
  const pageSize = 10;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  //const data:Item[] = await Items()
  const sliceddata: equipmentlist[] = paginate(equipmentList, currentPage, pageSize);
  function findOverDue(equipid: number) {
    const taskInfo = pendingtask.find((task) => task.equipmentid === equipid);
    return taskInfo ? taskInfo.overdue_count : "0";
  }
  function findNoticeCount(equipid: number) {
    const taskInfo = pendingtask.find((task) => task.equipmentid === equipid);
    return taskInfo ? taskInfo.advance_notice_count : "0";
  }
  ////Update the milage and running hours based on equipment id; send a parameter to milage component as callback function
  const updateEquipment = (id: number, additionalRunningHours: number, additionalMilageMeter: number) => {
    setEquipmentList(prevList =>
      prevList.map(equipment =>
        equipment.id === id
          ? {
              ...equipment,
              runninghour: equipment.runninghour + additionalRunningHours,
              milagemeter: equipment.milagemeter
                ? equipment.milagemeter + additionalMilageMeter
                : additionalMilageMeter, // Handle nullable field
            }
          : equipment
      )
    );
  };
  
  return (
    /*********For Task entry */
    <>
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Add PM Task"
      >
        <EquipTask
          tasks={tasklist}
          equipid={equipId}
          equipname={equipname}
          setIsOpen={setIsOpen}
          apipath={apipath}
        />
      </ResponsiveDialog>

      <ResponsiveDialog
        isOpen={isFuelOpen}
        setIsOpen={setIsFuelOpen}
        title="Add Fuel Entry"
      >
        <FuelEntry
          equipid={equipId}
          equipname={equipname}
          employee={employee}
          setIsOpen={setIsFuelOpen}
          apipath={apipath}
          username={username}
        />
      </ResponsiveDialog>
      <ResponsiveDialog
        isOpen={isReactiveOpen}
        setIsOpen={setIsReactiveOpen}
        title="Add Reactive Maintainance Record"
      >
        <AddReactiveMaintenance
          equipmentno={equipId}
          equipmentdesc={equipname}
          employee={employee}
          username={username}
          setIsOpen={setIsReactiveOpen}
        />
      </ResponsiveDialog>
      <ResponsiveDialog
        isOpen={isMilageOpen}
        setIsOpen={setIsMilageOpen}
        title="Add Milage"
      >
        <MilageUpdateForm
          equipmentId={equipId}
          equipmentDescription={equipname}
          setIsOpen={setIsMilageOpen}
          username={username}
          updateEquipment={updateEquipment}
        />
      </ResponsiveDialog>
      <div className="table-auto w-full bg-white rounded-lg overflow-hidden shadow-md">
        <table className="table-auto w-full bg-white rounded-lg overflow-hidden shadow-md ">
          <thead className="bg-white text-gray-900 dark:bg-white">
            <tr>
              <th className="py-2 px-4 font-sans text-base text-left">
                Equimpment
              </th>
              <th className="py-2 px-4 font-sans text-base text-left">
                Running Hours
              </th>
              <th className="py-2 px-4 font-sans text-base text-left">
                Meters
              </th>
              <th className="py-2 px-4 font-sans text-base text-left">Tasks</th>
              <th className="py-2 px-4 font-sans text-base text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sliceddata.map((equipment, index) => (
              <tr key={index} className="bg-white text-gray-800">
                <td className="py-2 px-4 hover:bg-gray-200 text-sm">
                  <Link
                    href={`/others/equipments/${equipment.id}`}
                  >{`${equipment.name}/${equipment.model}`}</Link>
                </td>
                <td className="py-2 px-4 hover:{bg-gray-200 text-sm}">
                  {equipment.runninghour}
                </td>
                <td className="py-2 px-4 text-sm">{equipment.milagemeter}</td>
                <td className="py-2 px-4 text-sm">
                  <p className="bg-red-600 text-white">
                    {" "}
                    {findOverDue(equipment.id)} Overdue{" "}
                  </p>
                  <p className="bg-pink-400 text-white">
                    {" "}
                    {findNoticeCount(equipment.id)} To soon{" "}
                  </p>
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
                              setEquipId(equipment.id);
                              setEquipName(
                                `${equipment.name}/${equipment.model}`
                              );
                              setIsOpen(true);
                            }}
                            className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                          >
                            Add PM Task
                          </button>
                        </DropdownMenuLabel>
                        <DropdownMenuLabel>
                          <button
                            onClick={() => {
                              setEquipId(equipment.id);
                              setEquipName(
                                `${equipment.name}/${equipment.model}`
                              );
                              setIsFuelOpen(true);
                            }}
                            className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                          >
                            Add Fuel Record
                          </button>
                        </DropdownMenuLabel>
                        <DropdownMenuLabel>
                          <button
                            onClick={() => {
                              setEquipId(equipment.id);
                              setEquipName(
                                `${equipment.name}/${equipment.model}`
                              );
                              setIsReactiveOpen(true);
                            }}
                            className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                          >
                            Add Reactive Maint.
                          </button>
                        </DropdownMenuLabel>
                        <DropdownMenuLabel>
                          <button
                            onClick={() => {
                              setEquipId(equipment.id);
                              setEquipName(
                                `${equipment.name}/${equipment.model}`
                              );
                              setIsMilageOpen(true);
                            }}
                            className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                          >
                            Add Meter Log
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
        <Pagination
          items={data.length} // 100
          currentPage={currentPage} // 1
          pageSize={pageSize} // 10
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};
export default EquipmentList;
