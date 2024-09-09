"use client";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MasterType } from "@/lib/zod";

const EnumCombo = ({
  lists,
  heading,
  placeholder,
  onSelectedIdsChange,
}: {
  lists: MasterType;
  heading: string;
  placeholder: string;
  onSelectedIdsChange: (ids: string[]) => void; // For Prop Dealing the Selected ID's to parents
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedDescriptions, setSelectedDescriptions] = useState<string[]>(
    []
  );

  const handleSelectChange = (id: string, desc: string) => {
    //Showing selected Descriptions on Text Box while Saving Ids for DB Operation

    console.log(selectedOptions);
    console.log(selectedDescriptions);
    setSelectedOptions((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
    setSelectedDescriptions((prevDescs) =>
      prevDescs.includes(desc)
        ? prevDescs.filter((item) => item !== desc)
        : [...prevDescs, desc]
    );
  };
  useEffect(() => {
    console.log(selectedDescriptions);
    console.log(selectedOptions);
    onSelectedIdsChange(selectedOptions);
  }, [selectedOptions]);
  return (
    <>
      <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
        <Textarea
          placeholder="Select from List to add On this text; You can choose Multiple values; For removing also select from list"
          value={selectedDescriptions.join(", ") || ""}
          className="text-black"
          readOnly
        />
      </div>
      <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
        <Select
          onValueChange={(value) => {
            const selectedItem = lists.find((item) => item.id === value);
            if (selectedItem) {
              handleSelectChange(selectedItem.id, selectedItem.desc);
            }
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{heading}</SelectLabel>
              {lists.map((list, index) => (
                <SelectItem key={index} value={list.id}>
                  {list.desc}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default EnumCombo;
