"use client";
import React, { useEffect, useState } from "react";
import { Bar, BarChart } from "recharts";

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface MonthlyCostsProps {
  equipid: number;
}

const MonthlyCosts: React.FC<MonthlyCostsProps> = ({ equipid }) => {
  const [monthlyData, setMonthlyData] = useState<{
    months: string[];
    costs: number[];
  }>({ months: [], costs: [] });

  useEffect(() => {
    const fetchMonthlyCosts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_PATH}monthly-total-cost/${equipid}`
        );
        const result = await response.json();
        setMonthlyData(result.rows());
      } catch (error) {
        console.error("Error fetching monthly costs:", error);
      }
    };

    fetchMonthlyCosts();
  }, [equipid]);

  const data = {
    labels: monthlyData.months,
    datasets: [
      {
        label: "Total Cost",
        data: monthlyData.costs,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="bg-gray-500 p-4">
      <h2 className="text-white">Monthly Costs</h2>

      <BarChart data={monthlyData.costs}>
        <Bar dataKey="value" />
      </BarChart>
    </div>
  );
};

export default MonthlyCosts;
