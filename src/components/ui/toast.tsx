"use client";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
export default function Mytoast({ message }: { message: string }) {
  const handleButtonClick = () => {
    toast.success(<Link href="/notificationlist">{message}</Link>); // Displays a success message
  };

  return (
    <div>
      <button onClick={handleButtonClick}>
        {" "}
        <FontAwesomeIcon icon={faBell} />
      </button>
    </div>
  );
}
