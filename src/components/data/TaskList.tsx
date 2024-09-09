"use client";
import { useState } from "react";
import Pagination from "../tools/pagination";
import { Tasks } from "@/lib/zod";
import Link from "next/link";

export const paginate = (
  tasks: Tasks,
  pageNumber: number,
  pageSize: number
) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return tasks.slice(startIndex, startIndex + pageSize);
};
interface taskProps {
  data: Tasks;
}

const TaskList: React.FC<taskProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  //const data:Item[] = await Items()
  const sliceddata: Tasks = paginate(data, currentPage, pageSize);

  return (
    <div className="table-auto w-full bg-white rounded-lg overflow-hidden shadow-md">
      <table className="table-auto w-full bg-white rounded-lg overflow-hidden shadow-md ">
        <thead className="bg-white text-gray-900 dark:bg-white">
          <tr>
            <th className="py-2 px-4 font-sans text-base text-left">
              Task Name
            </th>
            <th className="py-2 px-4 font-sans text-base text-left">
              Frequency
            </th>
            <th className="py-2 px-4 font-sans text-base text-left">
              Advance Notice
            </th>
            <th className="py-2 px-4 font-sans text-base text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {sliceddata.map((mytask, index) => (
            <tr key={index} className="bg-white text-gray-800">
              <td className="py-2 px-4 hover:bg-gray-200 text-sm">
                <Link href={`/tasks/${mytask.id}`}>{mytask.name}</Link>
              </td>
              <td className="py-2 px-4 hover:{bg-gray-200 text-sm}">
                {mytask.frequency} {mytask.frequnit}
              </td>
              <td className="py-2 px-4 text-sm">
                {mytask.advnotice} {mytask.frequnit}
              </td>
              <td className="py-2 px-4 text-sm">Will Implement Soon</td>
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
export default TaskList;
