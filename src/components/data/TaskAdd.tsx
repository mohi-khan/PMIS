"use client";

import React, { useState } from "react";

export default function TaskAdd({ apipath }: { apipath: String }) {
  const [taskname, setTaskName] = useState("");
  const [frequency, setFrequency] = useState(0);
  const [frequencyUnit, setFrequencyUnit] = useState("Kilo");
  const [advnotice, setAdvNotice] = useState(0);
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
    const mydata = {
      taskname: taskname,
      frequency: frequency,
      frequencyunit: advnotice,
      advnotice: advnotice,
    };
    console.log(mydata);
    try {
      const response = await fetch(`${apipath}tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer pmis",
        },
        body: JSON.stringify(mydata),
      });

      response.ok ? setDisable(true) : alert("Wrong Error");

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
              {["Kilo", "Running Hours", "Days"].map((man, index) => (
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
            Add to Records
          </button>
        </div>
      </form>
    </div>
  );
}
