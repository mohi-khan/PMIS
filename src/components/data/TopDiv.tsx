"use client";
import { useState, useEffect } from "react";

interface TopDivProps {
  equipid: number;
}

function TopDiv({ equipid }: TopDivProps) {
  const [selectedMonth, setSelectedMonth] = useState(1); // Default to 1 month
  const [totalCost, setTotalCost] = useState(100);

  useEffect(() => {
    // Fetch the total cost whenever selectedMonth changes
    async function fetchTotalCost() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_PATH}equipcost/${equipid}/month/${selectedMonth}`
        );

        const result = await response.json();

        setTotalCost(result.totalCost || 0);
      } catch (error) {
        console.error("Error fetching total cost:", error);
      }
    }

    fetchTotalCost();
  }, [selectedMonth, equipid]);

  return (
    <div className="h-3/10 bg-gray-400 p-4 flex flex-col space-y-4">
      <div>
        <label
          htmlFor="month-select"
          className="block text-sm font-medium text-gray-700"
        >
          Select Month:
        </label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value={1}>Last 1 month</option>
          <option value={3}>Last 3 months</option>
          <option value={6}>Last 6 months</option>
          <option value={12}>Last 12 months</option>
        </select>
      </div>
      <div className="text-lg font-semibold">Total Cost: ${totalCost}</div>
    </div>
  );
}

export default TopDiv;
