"use client";
import { useState } from "react";
import Pagination from "../tools/pagination";
import { NotificaionType, vendorList } from "@/lib/zod";
import { ResponsiveDialog } from "../dialogui/Dialogui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { Button } from "../ui/button";
import WorkOrder from "./WorkOrder";

const NotificationList = ({
  data,
  vendors,
  employee,
  apipath,
  username,
}: {
  data: NotificaionType;
  vendors: vendorList;
  employee: vendorList;
  apipath: string;
  username: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [equipId, setEquipId] = useState(0);
  const [equipDetails, setEquipDetails] = useState("");
  const [taskId, setTaskId] = useState(0);
  const [taskName, setTaskName] = useState("");

  return (
    <>
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Add WorkOrder"
      >
        <WorkOrder
          equipmentId={equipId}
          equipDetails={equipDetails}
          taskid={taskId}
          taskname={taskName}
          vendors={vendors}
          employee={employee}
          setIsOpen={setIsOpen}
          username={username}
        />
      </ResponsiveDialog>

      <div className="table-auto w-full bg-white rounded-lg overflow-hidden shadow-md">
        <table className="table-auto w-full bg-white rounded-lg overflow-hidden shadow-md ">
          <thead className="bg-white text-gray-900 dark:bg-white">
            <tr>
              <th className="py-2 px-4 font-sans text-base text-left">
                Equipment
              </th>
              <th className="py-2 px-4 font-sans text-base text-left">Task</th>
              <th className="py-2 px-4 font-sans text-base text-left">
                Status
              </th>
              <th className="py-2 px-4 font-sans text-base text-left">
                Notification
              </th>
              <th className="py-2 px-4 font-sans text-base text-left">..</th>
              <th className="py-2 px-4 font-sans text-base text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((notification, index) => (
              <tr key={index} className="bg-white text-gray-800">
                <td className="py-2 px-4 hover:bg-gray-200 text-sm">
                  {`${notification.equipmentname}/${notification.model}`}
                </td>
                <td className="py-2 px-4 hover:{bg-gray-200 text-sm}">
                  {notification.taskname}
                </td>
                <td className="py-2 px-4 text-sm">{notification.status}</td>
                <td className="py-2 px-4 text-sm">
                  {notification.noticestatus}
                </td>
                <td
                  className={`py-2 px-4 text-sm ${
                    notification.wostatus ? "bg-yellow-400 opacity-50%" : ""
                  }`}
                >
                  {notification.wostatus}
                </td>
                <td className="py-2 px-4 text-sm">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button>
                        <IoIosArrowDropdownCircle />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuTrigger>
                      <DropdownMenuContent className="w-22">
                        <DropdownMenuLabel>
                          <button
                            onClick={() => {
                              setEquipId(notification.equipmentid);
                              setTaskId(notification.equipmenttaskschid);
                              setTaskName(notification.taskname);
                              setEquipDetails(
                                `${notification.equipmentname}/${notification.model}`
                              );
                              setIsOpen(true);
                            }}
                            className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                          >
                            Add Work Order
                          </button>
                        </DropdownMenuLabel>
                      </DropdownMenuContent>
                    </DropdownMenuTrigger>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
      </div>
    </>
  );
};
export default NotificationList;
