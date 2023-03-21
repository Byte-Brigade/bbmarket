import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "./Button";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="p-4 shadow-sm md:flex md:justify-between md:items-center bg-slate-100">
      <div className="flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-semibold">BBMarket</h1>
        </Link>

        <button
          onClick={() => console.log("clicked")}
          className="flex items-center justify-center md:hidden bg-slate-200 rounded-xl focus:ring-2 focus:ring-slate-500"
        >
          <span className="p-1">
            <IconMenu2 className="stroke-slate-800" />
          </span>
        </button>
      </div>
      <div className="md:flex md:gap-x-4 md:items-center">
        <ul className="py-2 md:flex md:gap-x-4">
          <li
            className={`w-full hover:text-sky-500 transition-colors duration-300 ${
              router.pathname === "/"
                ? "text-sky-500 border-b border-sky-500"
                : "text-black"
            }`}
          >
            <Link href="/">
              <p className="text-lg">Home</p>
            </Link>
          </li>
          <li
            className={`w-full hover:text-sky-500 transition-colors duration-300 ${
              router.pathname === "/products"
                ? "text-sky-500 border-b border-sky-500"
                : "text-black"
            }`}
          >
            <Link href="/products">
              <p className="text-lg">Products</p>
            </Link>
          </li>
          <li
            className={`w-full hover:text-sky-500 transition-colors duration-300 ${
              router.pathname === "/about"
                ? "text-sky-500 border-b border-sky-500"
                : "text-black"
            }`}
          >
            <Link href="/about">
              <p className="text-lg">About</p>
            </Link>
          </li>
        </ul>

        <Button title="Login" onClick={() => router.push("/auth/login")} />
      </div>
    </nav>
  );
}
