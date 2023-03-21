import { auth } from "@/utils/firebase";
import {
  IconDashboard,
  IconLogout,
  IconMenu2,
  IconMessage,
  IconUser,
} from "@tabler/icons-react";
import { signOut } from "firebase/auth";
import { Button } from "flowbite-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Sidebar() {
  const [active, setActive] = useState(false);

  const sidebarHandler = () => {
    setActive(!active);
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Success!");
        localStorage.removeItem("user");
      })
      .catch((err) => {
        toast.error(err.code);
      });
  };

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        onClick={sidebarHandler}
      >
        <span className="sr-only">Open Sidebar</span>
        <IconMenu2 />
      </button>

      <aside
        className={`fixed top-14 sm:top-0 left-0 z-40 w-64 h-screen transition-transform ${
          active ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
          <ul className="space-y-2">
            <li>
              <span className="p-2 text-sm font-semibold tracking-wider text-gray-400">
                BUSINESS
              </span>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <IconDashboard className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
          </ul>
          <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200">
            <li>
              <span className="p-2 text-sm font-semibold tracking-wider text-gray-400">
                MENU
              </span>
            </li>
            <li>
              <Link
                href="/messages"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <IconMessage className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                <span className="flex-1 ml-3 whitespace-nowrap">Messages</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full ">
                  10+
                </span>
              </Link>
            </li>
          </ul>
          <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200">
            <li>
              <span className="p-2 text-sm font-semibold tracking-wider text-gray-400">
                SETTING
              </span>
            </li>
            <li>
              <Link
                href="/dashboard/profile"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <IconUser className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                <span className="ml-3">Profile</span>
              </Link>
            </li>
            <li>
              <Button color="failure" onClick={logout}>
                <IconLogout className="w-6 h-6 mr-3 transition duration-75" />
                Logout
              </Button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
