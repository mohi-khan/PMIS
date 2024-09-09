"use client";
import React, { useState, useEffect } from "react";

interface Equipment {
  id: number;
  desc: string;
}

interface Job {
  id: number;
  taskname: string;
}
interface Maintenance {
  id: number;
  description: string;
}
const FormReport: React.FC = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<number | null>(
    null
  );
  const [selectedMaintenance, setSelectedMaintenance] = useState<number | null>(
    null
  );
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [selectedReportType, setSelectedReportType] =
    useState<string>("workorder");

  useEffect(() => {
    // Fetch equipment data from API
    fetch(`${process.env.NEXT_PUBLIC_API_PATH}equipmentMasterList`)
      .then((res) => res.json())
      .then((data) => setEquipment(data));
  }, []);

  useEffect(() => {
    if (selectedEquipment !== null) {
      // Fetch job data based on selected equipment id
      fetch(`${process.env.NEXT_PUBLIC_API_PATH}tasklist/${selectedEquipment}`)
        .then((res) => res.json())
        .then((data) => setJobs(data))
        .catch((err) => console.error(err));

      fetch(
        `${process.env.NEXT_PUBLIC_API_PATH}maintenancelist/${selectedEquipment}`
      )
        .then((res) => res.json())
        .then((data) => setMaintenances(data))
        .catch((err) => console.error(err));
    }
  }, [selectedEquipment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      selectedReportType === "workorder" &&
      selectedEquipment &&
      selectedJob
    ) {
      window.location.href = `/reports/workorder/${selectedEquipment}/${selectedJob}`;
    } else if (
      selectedReportType === "maintenance" &&
      selectedEquipment &&
      selectedMaintenance
    ) {
      window.location.href = `/reports/maintenance/${selectedEquipment}/${selectedMaintenance}`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="equipment"
          className="block text-sm font-medium text-gray-700"
        >
          Equipment
        </label>
        <select
          id="equipment"
          value={selectedEquipment || ""}
          onChange={(e) => setSelectedEquipment(Number(e.target.value))}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="" disabled>
            Select Equipment
          </option>
          {equipment.map((eq) => (
            <option key={eq.id} value={eq.id}>
              {`${eq.desc}`}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="reportType"
          className="block text-sm font-medium text-gray-700"
        >
          Report Type
        </label>
        <select
          id="reportType"
          value={selectedReportType}
          onChange={(e) => setSelectedReportType(e.target.value)}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="workorder">Work Order</option>
          <option value="maintenance">Reactive Maintenance</option>
        </select>
      </div>

      {selectedReportType === "workorder" && (
        <div>
          <label
            htmlFor="job"
            className="block text-sm font-medium text-gray-700"
          >
            Work Order
          </label>
          <select
            id="job"
            value={selectedJob || ""}
            onChange={(e) => setSelectedJob(Number(e.target.value))}
            required={selectedReportType === "workorder"}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="" disabled>
              Select Job
            </option>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.taskname}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedReportType === "maintenance" && (
        <div>
          <label
            htmlFor="maintenance"
            className="block text-sm font-medium text-gray-700"
          >
            Reactive Maintenance
          </label>
          <select
            id="maintenance"
            value={selectedMaintenance || ""}
            onChange={(e) => setSelectedMaintenance(Number(e.target.value))}
            required={selectedReportType === "maintenance"}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="" disabled>
              Select Maintenance
            </option>
            {maintenances.map((maintenance) => (
              <option key={maintenance.id} value={maintenance.id}>
                {maintenance.description}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm"
      >
        Show Report
      </button>
    </form>
  );
};

export default FormReport;
