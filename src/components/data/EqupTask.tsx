"use client";

import { TaskList } from "@/lib/zod";
import { useState } from "react";
const EqupTask = ({
  tasks,
  equipid,
  equipname,
  setIsOpen,
  apipath,
}: {
  tasks: TaskList;
  equipid: number;
  equipname: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  apipath: string;
}) => {
  const [selectTask, setSelectTask] = useState(tasks[0].id || 0);
  const [status, setStatus] = useState("Active");
  const [freqDay, setFreqDay] = useState(0);
  const [days, setDays] = useState("days");
  const [advNotice, setAdvNotice] = useState(0);
  const [performDate, setPerformDate] = useState("01/01/1900");
  const [performH, setPerformH] = useState(0);
  const [freqKm, setFreqKm] = useState(0);
  const [advNoticek, setAdvNoticek] = useState(0);
  const [lastPerformk, setlastPerformk] = useState(0);
  const [disable, setDisable] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!equipid) {
      alert("Equipment Id Required");
      return;
    }
    if (!selectTask) {
      alert("Task Name Required");
      return;
    }
    if (advNotice >= freqDay && freqDay > 0) {
      alert(`Advance Notice Should be less then Frequency Day`);
      return;
    }
    if (freqDay > 0 && days == "Days" && !performDate) {
      alert("Last perform Date Required for Day");
      return;
    }
    if (freqDay > 0 && days == "Month" && !performDate) {
      alert("Last perform Date Required for Month");
      return;
    }
    if (advNoticek >= freqKm && freqKm > 0) {
      alert("Advance Notice Should be more then Frequency Km");
      return;
    }

    const mydata = {
      equipmentid: equipid,
      taskid: selectTask,
      frequencytime: freqDay,
      frequencytimeunit: days,
      advancenoticetime: advNotice,
      lastperformed: performDate,
      lastperformeh: performH,
      notes: "",
      status: status,
      frequencykm: freqKm,
      lastperformedkm: lastPerformk,
      advanceNoticekm: advNoticek,
    };
    console.log(mydata);
    try {
      const response = await fetch(`${apipath}tasksch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer pmis",
        },
        body: JSON.stringify(mydata),
      });

      if (response.ok) {
        alert("Record Updated Successfully!"), setIsOpen(false);
      } else alert("Failed to Enter Data!!");
    } catch (e: any) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-blue-600 text-lg font-extrabold">{equipname}</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-1">
            <div className="mb-2 flex space x-4">
              <label className="block text-sm font-medium text-gray-700">
                Task Name
              </label>

              <select
                value={selectTask}
                onChange={(e) => setSelectTask(parseInt(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {tasks.map((task, index) => (
                  <option key={index} value={task.id}>
                    {task.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <div className="flex items-center">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {["Active", "Postpond"].map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-1">
              <h3 className="font-bold">Date Tracking</h3>
            </div>
            <div className="mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Every
              </label>
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={freqDay}
                  onChange={(e) => setFreqDay(parseInt(e.target.value))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <select
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {["Days", "Hours", "Month"].map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-small text-gray-700">
                Advance Notice
              </label>
              <div className="flex space x-4">
                <input
                  type="text"
                  value={advNotice}
                  onChange={(e) => setAdvNotice(parseInt(e.target.value))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <label className="block text-sm font-medium text-gray-700">
                  {days}
                </label>
              </div>
            </div>
            <div className="mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Last Performed (Date/Hours)
              </label>
              <input
                type="date"
                value={performDate.toString()}
                onChange={(e) => setPerformDate(e.target.value)}
                className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <input
                type="text"
                value={performH}
                onChange={(e) => setPerformH(parseInt(e.target.value))}
                className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-1">
              <h3 className="font-bold">Kilometer Tracking</h3>
            </div>
            <div className="mb-2 ">
              <label className="block text-sm font-medium text-gray-700">
                Every
              </label>
              <div className="flex space x-4">
                <input
                  type="text"
                  value={freqKm}
                  onChange={(e) => setFreqKm(parseInt(e.target.value))}
                  className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <label className="block text-sm font-medium text-gray-700">
                  Kms
                </label>
              </div>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Advance Notice
              </label>
              <div className="flex space x-4">
                <input
                  type="text"
                  value={advNoticek}
                  onChange={(e) => setAdvNoticek(parseInt(e.target.value))}
                  className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <label className="block text-sm font-medium text-gray-700">
                  Kms
                </label>
              </div>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Last Performed
              </label>
              <input
                type="text"
                value={lastPerformk}
                onChange={(e) => setlastPerformk(parseInt(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
                disabled={disable}
              >
                Add to Records
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EqupTask;
