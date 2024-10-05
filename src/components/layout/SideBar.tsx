import React, { useState } from "react";
import Link from "next/link";
import { auth } from "@/auth";

export default async function SideBar() {
  const session = await auth();

  if (!session)
    return (
      <div>
        <p className="text-white">Not Authorized</p>
      </div>
    );
  return (
    <div className="fixed h-screen overflow-y-auto bg-gray-800 text-white w-60">
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className="text-white font-bold text-lg">Maintainance Pro</h1>
        <button className="text-white focus:outline-none">
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H11L4 22Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </div>
      <nav className="bg-gray-800 p-4">
        <ul className="flex flex-col pt-4">
          <li className="group">
            <p className="px-4 py-2 text-gray-300 hover:text-white font-medium rounded-t-md">
              <Link href="/others/equipments">Equipments</Link>
            </p>
            <p className="px-4 py-2 text-gray-300 hover:text-white font-medium rounded-t-md">
              <Link href="/others/tasks">Tasks</Link>
            </p>
            <p className="px-4 py-2 text-gray-300 hover:text-white font-medium rounded-t-md">
              <Link href="/others//workorder"> Work Orders</Link>
            </p>
            <p className="px-4 py-2 text-gray-300 hover:text-white font-medium rounded-t-md">
              <Link href="/others/spareparts">Spare </Link>
            </p>
            <p className="px-4 py-2 text-gray-300 hover:text-white font-medium rounded-t-md">
              Vendors
            </p>
            <p className="px-4 py-2 text-gray-300 hover:text-white font-medium rounded-t-md">
              <Link href="/others/reports/parameters">Reports</Link>
            </p>
          </li>
        </ul>
      </nav>
    </div>
  );
}
