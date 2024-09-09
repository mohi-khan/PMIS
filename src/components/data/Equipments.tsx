"use client";
import { useState } from "react";
import { equipments } from "@/lib/zod";

interface equipmentProps {
  data: equipments;
}
const EquipmentView: React.FC<equipmentProps> = ({ data }) => {
  console.log(data);
  return (
    <div className="p-4">
      <h3 className="font-bold text-lg">Identification</h3>
      <table className="w-full my-2">
        <tbody>
          <tr>
            <td className="font-semibold pr-4">Serial:</td>
            <td className="font-light">{data.serial}</td>
          </tr>
          <tr>
            <td className="font-semibold pr-4">Description:</td>
            <td className="font-light">{data.name}</td>
          </tr>
          <tr>
            <td className="font-semibold pr-4">Model:</td>
            <td className="font-light">{data.model}</td>
          </tr>
          <tr>
            <td className="font-semibold pr-4">Manufacturer:</td>
            <td className="font-light">{data.manufacturur}</td>
          </tr>
        </tbody>
      </table>

      <h3 className="font-bold text-lg">Assignment</h3>
      <table className="w-full my-2">
        <tbody>
          <tr>
            <td className="font-semibold pr-4">Status:</td>
            <td className="font-light">{data.status}</td>
          </tr>
          <tr>
            <td className="font-semibold pr-4">Location:</td>
            <td className="font-light">{data.location}</td>
          </tr>
        </tbody>
      </table>

      <h3 className="font-bold text-lg">Purchase</h3>
      <table className="w-full my-2">
        <tbody>
          <tr>
            <td className="font-semibold pr-4">Purchase Date:</td>
            <td className="font-light">{data.purchasedate}</td>
          </tr>
          <tr>
            <td className="font-semibold pr-4">Vendor:</td>
            <td className="font-light">Will Implement Later</td>
          </tr>
        </tbody>
      </table>

      <h3 className="font-bold text-lg">Additional Details</h3>
      <table className="w-full my-2">
        <tbody>
          <tr>
            <td className="font-semibold pr-4">Running Hours:</td>
            <td className="font-light">{data.runninghour}</td>
          </tr>
          <tr>
            <td className="font-semibold pr-4">Mileage:</td>
            <td className="font-light">{data.milagemeter}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export async function generateStaticParams() {
  const response = await fetch(`${process.env.API_PATH}equipments`, {
    cache: "no-store",
  });
  const result = await response.json();
  console.log(result);
  return result;
}

export default EquipmentView;
