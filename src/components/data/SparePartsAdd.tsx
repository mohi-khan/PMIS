"use client";

import { MasterType, TaskList } from "@/lib/zod";

import { useState } from "react";
import EnumCombo from "../tools/EnumCombo";

const SparePartsAdd = ({
  //setIsOpen,
  lists,
  apipath,
  username,
}: {
  //setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  lists: MasterType;
  apipath: string;
  username: string;
}) => {
  const [spareName, setSpareName] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [disable, setDisable] = useState(false);
  const handleSelectedIdsChange = (ids: string[]) => {
    setSelectedIds(ids);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!spareName) {
      alert("Spare Parts Name Required");
      return;
    }
    if (selectedIds.length == 0) {
      alert("Equipment Name  Required");
      return;
    }

    const mydata = {
      spareName: spareName,
      equipids: selectedIds,
      username: username,
    };
    console.log(selectedIds);
    try {
      const response = await fetch(`${apipath}spareadd`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer pmis",
        },
        body: JSON.stringify(mydata),
      });

      if (response.ok) {
        alert("Record Updated Successfully!") /*setIsOpen(false)*/;
        window.location.reload();
      } else alert("Failed to Enter Data!!");
    } catch (e: any) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-blue-600 text-lg font-extrabold">
          Enter Spare Details
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-1">
            <div className="mb-2 flex space x-4">
              <label className="block text-sm font-medium text-gray-700">
                Spare Parts Name
              </label>
              <input
                type="text"
                value={spareName}
                onChange={(e) => setSpareName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-2 flex space x-4">
              <label className="block text-sm font-medium text-gray-700">
                Choose Equipments
              </label>

              <EnumCombo
                lists={lists}
                heading="Equipment"
                placeholder="Select an Equipment"
                onSelectedIdsChange={handleSelectedIdsChange}
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

export default SparePartsAdd;
