"use client";
import { useState } from "react";
import Pagination from "../tools/pagination";
import { MasterType, task, Tasks } from "@/lib/zod";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { ResponsiveDialog } from "../dialogui/Dialogui";
import TaskEdit from "./TaskEdit";
import TaskEquip from "./TaskEquip";
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
  equips:MasterType
}

const TaskList: React.FC<taskProps> = ({ data,equips }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [tasks,setTasks]=useState(data);
  const [isOpen,setIsOpen]=useState(false);
  const [isEquipOpen,setIsEquipOpen]=useState(false);
  const [currentTask,setCurrentTask]=useState<task>(tasks[0])
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  //const data:Item[] = await Items()
 
  const sliceddata: Tasks = paginate(tasks, currentPage, pageSize);
  const cancelTask = async (taskid: number) => {
  
    
    try {
      const isConfirmed = window.confirm("Are you sure you want to cancel this task?");
    
      if (!isConfirmed) return;
      const mydata={taskid:taskid};
     
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}cancel-task`, {
        method: "POST", // Use DELETE or POST based on your API's requirement
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mydata)

      });
      
      if (response.ok) {
        // Task canceled, refresh the task list by removing the canceled task from the state
        const updatedTasks = tasks.filter(task => task.taskid !== taskid);
        setTasks(updatedTasks);
      } else {
        console.error("Failed to cancel the task");
      }
    } catch (error) {
      console.error("Error canceling the task:", error);
    }
    
    
  };
  const handleTaskUpdate = (updatedTask: task) => { //Update the task list with updateed task; send as call back to takeedit
    
    setTasks(prevTasks =>
      prevTasks.map(task => (task.taskid === updatedTask.taskid ? updatedTask : task))
    );
  };
  return (
    <>
   
    <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Update Tasks"
      >
        
        <TaskEdit
          task={currentTask}
          setIsOpen={setIsOpen}
          onTaskUpdated={handleTaskUpdate}
        />
      </ResponsiveDialog>
      <ResponsiveDialog
        isOpen={isEquipOpen}
        setIsOpen={setIsEquipOpen}
        title="Add Equipment to Task"
      >
        
        <TaskEquip
          equips={equips}
          currenttask={currentTask}
          setIsOpen={setIsOpen}
          
        />
      </ResponsiveDialog>
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
                <Link href={`/tasks/${mytask.taskid}`}>{mytask.taskname}</Link>
              </td>
              <td className="py-2 px-4 hover:{bg-gray-200 text-sm}">
                {mytask.frequency} {mytask.frequencyunit}
              </td>
              <td className="py-2 px-4 text-sm">
                {mytask.advancenotice} {mytask.frequencyunit}
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
                           
                            const task = tasks.find(task => task.taskid === mytask.taskid);
                            setCurrentTask(task ? task :tasks[0]);
                            setIsEquipOpen(true);
                            }}
                          className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                        >
                          Attach to Equipment
                        </button>
                      </DropdownMenuLabel>

                      <DropdownMenuLabel>
                        <button
                          onClick={() => {cancelTask(mytask.taskid)}}
                          className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                        >
                          Cancel Task
                        </button>
                      </DropdownMenuLabel>

                      <DropdownMenuLabel>
                        <button
                          onClick={() => {
                            setIsOpen(true);
                            const task = tasks.find(task => task.taskid === mytask.taskid);
                            setCurrentTask(task ? task :tasks[0]);
                            }}
                          className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                        >
                          Edit Task
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
export default TaskList;
