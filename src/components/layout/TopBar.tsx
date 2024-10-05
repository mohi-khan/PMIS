
import React from "react";
import Link from "next/link";
import UserName from "../UserName";
import { auth } from "@/auth";
import Mytoast from "@/components/ui/toast";
export default async function TopBar() {
  console.log(process.env.API_PATH)
  const response = await fetch(`${process.env.API_PATH}notificationcount`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const result = await response.json();
    const message=result.message;
  console.log(message);
  return (
    <nav className="bg-gray-700 p-4 flex items-center justify-between">
      <UserName />
      <Mytoast message={message} />
    </nav>
  );
}
