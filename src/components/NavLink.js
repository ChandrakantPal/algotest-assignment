import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const NavLink = ({ href, text, onClick }) => {
  const { pathname } = useRouter();
  const isActive = pathname === href;
  return (
    <li onClick={onClick}>
      <Link
        href={href}
        className={`block py-2 pl-3 pr-4  rounded md:bg-transparent md:p-0 md:hover:text-blue-700 hover:bg-gray-100 md:hover:bg-transparent  ${
          isActive ? "text-white bg-blue-700 md:text-blue-500" : "text-white"
        }`}
      >
        {text}
      </Link>
    </li>
  );
};

export default NavLink;
