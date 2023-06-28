import * as React from "react";
import Link from "next/link";
import StocksLogoIcon from "./icons/StocksLogoIcon";
import MenuIcon from "./icons/MenuIcon";
import NavLink from "./NavLink";

const NavLinksList = [
  {
    href: "/",
    text: "Price",
  },
  {
    href: "/live",
    text: "Live",
  },
  {
    href: "/candlestick",
    text: "Candlestick",
  },
  {
    href: "/combined",
    text: "Combined",
  },
];

const Navbar = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 z-20 w-full bg-gray-900 border-b border-gray-600">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-2 mx-auto md:p-4">
        <Link href="/" className="flex items-center gap-2">
          <StocksLogoIcon />

          <span className="self-center text-lg font-medium text-white whitespace-nowrap">
            Stocks
          </span>
        </Link>
        <div className="flex md:order-2">
          <button
            onClick={() => {
              setOpen((current) => !current);
            }}
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 dark:text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <MenuIcon />
          </button>
        </div>
        <div
          className={`w-full md:block md:w-auto md:ml-auto ${
            open ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col p-4 mt-4 font-medium bg-gray-800 border border-gray-700 rounded-lg md:p-0 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-gray-900">
            {NavLinksList.map((item) => (
              <NavLink
                key={item.text}
                href={item.href}
                text={item.text}
                onClick={() => {
                  setOpen(false);
                }}
              />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
