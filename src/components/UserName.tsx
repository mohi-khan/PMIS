import { auth } from "../auth";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export default async function UserName() {
  const session = await auth();
  if (!session)
    return (
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Branding */}
        <p>welcome</p>
        <div className="text-white font-bold text-lg"> </div>
        {/* Navigation Menu */}
        <ul className="flex space-x-4">
          <li className="text-white hover:text-gray-300 cursor-pointer">
            <Link href="/signUp">Signup</Link>
          </li>
          <li className="text-white hover:text-gray-300 cursor-pointer">
            <Link href="/myLog">SignIn</Link>
          </li>
        </ul>
      </div>
    );
  return (
    <div className="container mx-auto flex justify-between items-center">
      {/* Logo or Branding */}
      <p>welcome,{session.user?.email}</p>
      <div className="text-white font-bold text-lg"> </div>

      {/* Navigation Menu */}

      <ul className="flex space-x-4">
        <li className="text-white hover:text-gray-300 cursor-pointer">
          <Link href="/signUp">Signup</Link>
        </li>
        <li className="text-white hover:text-gray-300 cursor-pointer">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/logOut">
                  {" "}
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Log out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
      </ul>
    </div>
  );
}
