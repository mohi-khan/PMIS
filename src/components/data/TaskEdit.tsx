"use client";

import { task } from "@/lib/zod";
import React, { useState } from "react";
interface TaskEditProps {
  task: task;
  setIsOpen: (isOpen: boolean) => void;
  onTaskUpdated: (updatedTask: task) => void; // New prop to update task in the parent
}
const TaskEdit: React.FC<TaskEditProps> = ({ task, setIsOpen, onTaskUpdated }) =>{
  const [taskname, setTaskName] = useState(task.taskname);
  const [frequency, setFrequency] = useState(task.frequency);
  const [frequencyUnit, setFrequencyUnit] = useState(task.frequencyunit);
  const [advnotice, setAdvNotice] = useState(task.advancenotice);
  const [disable, setDisable] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Logic to add the equipment to records

    if (!taskname) {
      alert("Task Name Required");
      return;
    }
    if (!frequency) {
      alert("Frequency Required");
      return;
    }
    if (!frequencyUnit) {
      alert("Frequency Unit Required");
      return;
    }
    if (!advnotice) {
      alert("Advance Notice Required");
      return;
    }
    const apipath = process.env.NEXT_PUBLIC_API_PATH;
    const mydata = {
      taskid: task.taskid,
      taskname: taskname,
      frequency: frequency,
      frequencyunit: frequencyUnit,
      advancenotice: advnotice,
    };
    console.log(mydata);
    try {
      const response = await fetch(`${apipath}update-task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer pmis"
        },
        body: JSON.stringify(mydata),
      });
      
      if (response.ok) {
        const result=await response.json();
        const updateTask=result.updatedTask;
        console.log(updateTask)
        alert(`Record Updated Successfully! Task Id: ${updateTask.taskid}`);
        onTaskUpdated(updateTask)
        setIsOpen(false)
      } else alert("Failed to Enter Data!!");

      //  alert(result);
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Task Name
            </label>
            <input
              type="text"
              value={taskname}
              onChange={(e) => setTaskName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Frequency ( In Number)
            </label>
            <div className="flex items-center">
              <input
                value={frequency}
                onChange={(e) => setFrequency(parseInt(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></input>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Frequency Unit
            </label>
            <select
              value={frequencyUnit}
              onChange={(e) => setFrequencyUnit(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {["Kilo", "Running Hours", "Days","Months"].map((man, index) => (
                <option key={index} value={man}>
                  {man}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Advance Notice
            </label>
            <input
              type="text"
              value={advnotice}
              onChange={(e) => setAdvNotice(parseInt(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
            disabled={disable}
          >
            Update Tasks
          </button>
        </div>
      </form>
    </div>
  );
}
export default TaskEdit;