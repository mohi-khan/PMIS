import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  title: string;
}

const ReportCard: React.FC<CardProps> = ({ title }) => {
  return (
    <div className={cn("p-4 bg-white rounded-lg shadow-md")}>
      <h2 className={cn("text-xl font-semibold mb-4")}>{title}</h2>
      <ul className={cn("list-none")}>
        <li className={cn("mb-2")}>
          <a
            href="/reports/parameters/jobcard"
            className={cn("text-blue-500 hover:underline")}
          >
            Job Card
          </a>
        </li>
        <li>
          <a
            href="/reports/parameters/fuelcard"
            className={cn("text-blue-500 hover:underline")}
          >
            Fuel Card
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ReportCard;
