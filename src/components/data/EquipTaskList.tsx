"use client";
import { useState } from "react";
import Pagination from "../tools/pagination";
import { TaskschType } from "@/lib/zod";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { Button } from "../ui/button";
import { formatDate } from "@/lib/utils";
export const paginate = (
  tasks: TaskschType,
  pageNumber: number,
  pageSize: number
) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return tasks.slice(startIndex, startIndex + pageSize);
};
interface taskProps {
  data: TaskschType;
}
const EquipTaskList: React.FC<taskProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const sliceddata: TaskschType = paginate(data, currentPage, pageSize);
  return (
    <div className="table-auto w-full bg-white rounded-lg overflow-hidden shadow-md">
      <table className="table-auto w-full bg-white rounded-lg overflow-hidden shadow-md ">
        <thead className="bg-white text-gray-900 dark:bg-white">
          <tr>
            <th className="py-2 px-4 font-sans text-base text-left">Task</th>
            <th className="py-2 px-4 font-sans text-base text-left">Status</th>
            <th className="py-2 px-4 font-sans text-base text-left"></th>
            <th className="py-2 px-4 font-sans text-base text-left"></th>
            <th className="py-2 px-4 font-sans text-base text-left"></th>
            <th className="py-2 px-4 font-sans text-base text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {sliceddata.map((task, index) => (
            <tr key={index} className="bg-white text-gray-800">
              <td className="py-2 px-4 hover:bg-gray-200 text-sm">
                {`${task.name}`}
              </td>
              <td className="py-2 px-4 hover:{bg-gray-200 text-sm}">
                {task.status}
              </td>
              <td className="py-2 px-4 text-sm">
                {" "}
                <div>
                  <p className="text-gray-400">Recurring/Due:</p>
                  <br />
                  <p className="text-gray-800">
                    {task.freqt} {task.frequ}
                  </p>
                  <br />
                  <p className="text-gray-800">{task.freqkm} Km</p>
                </div>
              </td>
              <td className="py-2 px-4 text-sm">
                {" "}
                <div>
                  <p className="text-gray-400">Advance Notice:</p>
                  <br />
                  <p className="text-gray-800">
                    {task.advnott} {task.frequ}
                  </p>
                  <br />
                  <p className="text-gray-800">{task.freqkm} Km</p>
                </div>
              </td>
              <td className="py-2 px-4 text-sm">
                {" "}
                <div>
                  <p className="text-gray-400">Last Performed:</p>
                  <br />
                  <p className="text-gray-800">
                    {formatDate(task.lastperford)}/{task.lastperformh} hour
                  </p>
                  <br />
                  <p className="text-gray-800">{task.lastperformkm} Km</p>
                </div>
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
                          onClick={() => {}}
                          className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                        >
                          Add Work Order
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
  );
};
export default EquipTaskList;
