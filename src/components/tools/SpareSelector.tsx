import { useState, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
interface spareList {
  code: number;
  name: string;
}
interface spareType {
  code: number;
  name: string;
  qty: number;
} ///For Storing Spare Parts
interface ImageSelectorProps {
  spareList: spareList[];
  onSpareListChange: (updatedSpareList: spareType[]) => void;
}
const SpareSelector = ({
  spareList,
  onSpareListChange,
}: ImageSelectorProps) => {
  const [sparePartName, setSparePartName] = useState("");
  const [qty, setQty] = useState(0);
  const [spareData, setSpareData] = useState<spareType[]>([]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [spareCode, setSpareCode] = useState(0);
  useEffect(() => {
    onSpareListChange(spareData); // Call the callback function to update the parent component
  }, [spareData]);
  const handleAddRow = () => {
    //When Click on Popup Button
    if (!spareCode) {
      alert("Select Spare Parts");
      return;
    }

    if (spareCode && qty) {
      const newRow: spareType = {
        code: spareCode,
        name: spareList.find((spare) => spare.code === spareCode)?.name || "",
        qty: qty,
      };
      const updatedSpareData = [...spareData, newRow];
      setSpareData(updatedSpareData);

      setSparePartName("");
      setQty(0);
      setSpareCode(0);
      setPopoverOpen(false); // Close the popover after adding the row
    }
  };
  const handleDeleteCard = (code: number) => {
    const updatedData = spareData.filter((spare) => spare.code !== code);
    setSpareData(updatedData);
  };
  return (
    <div>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">Add Spare Details</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div>
            <label htmlFor="sparePartName">Spare Part Name:</label>

            <select
              value={spareCode}
              onChange={(e) => setSpareCode(parseInt(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="0" key="0">
                Select Spare
              </option>
              {spareList.map((spare, index) => (
                <option key={index} value={spare.code}>
                  {spare.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="qty">Quantity:</label>
            <input
              type="number"
              id="qty"
              value={qty}
              onChange={(e) => setQty(parseInt(e.target.value))}
            />
          </div>
          <Button onClick={handleAddRow}>Add</Button>
        </PopoverContent>
      </Popover>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {spareData.map((card) => (
          <div
            key={card.code}
            className="bg-gray-700 opacity-50% text-white font-bold text-xs shadow rounded-lg p-4 border border-gray-200"
          >
            <div className="flex flex-col space-y-2">
              <p className="text-white">ID: {card.code}</p>
              <p className="text-white">Name: {card.name}</p>
              <p className="text-white">Qty: {card.qty}</p>
              <Button
                onClick={() => handleDeleteCard(card.code)}
                className="text-red-600 hover:text-red-900"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SpareSelector;
