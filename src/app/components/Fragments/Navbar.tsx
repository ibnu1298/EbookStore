"use client";
import { MdShoppingCart } from "react-icons/md";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import DropdownNext from "./Dropdown/DropdownNext";
import { useSession } from "next-auth/react";
import ModalLoginOrRegis from "./Modal/ModalLoginOrRegis";

const Navbar = () => {
  const { data: session }: { data: any } = useSession();
  const [dropdown, setDropdown] = useState("hidden");
  const [hideNav, setHideNav] = useState(false);
  const [login, setLogin] = useState(true);
  const [loginOrRegisModal, setLoginOrRegisModal] = useState("hidden");
  const pathName = usePathname();
  console.log(session);

  useEffect(() => {
    if (pathName == "/register" || pathName == "/login") {
      setHideNav(true);
    } else {
      setHideNav(false);
    }
  }, [pathName]);

  const showDropdown = () => {
    if (dropdown == "hidden") {
      setDropdown("");
    } else {
      setDropdown("hidden");
    }
  };
  const loginOrRegisFunc = (from: string) => {
   

    loginOrRegisModal == "hidden"
      ? setLoginOrRegisModal("")
      : setLoginOrRegisModal("hidden");

    if (from == "login") {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };
  return (
    <>
      <ModalLoginOrRegis
        show={loginOrRegisModal}
        showModal={loginOrRegisFunc}
        login={login}
      />
      <nav
        className="mt-0 fixed z-10 top-0 flex justify-center bg-gray-900 text-white w-screen "
        hidden={hideNav}
      >
        <div className="px-5 md:px-12 py-3 md:py-4 flex justify-between w-11/12 items-center">
          <a
            className="text-xl sm:text-3xl font-bold font-heading hover:underline"
            href="/"
          >
            Baret Store
          </a>
          <div className=" flex xl:flex items-center space-x-1 gap-5">
            <div className="flex relative items-center">
              <button className=" hover:bg-slate-600 focus:bg-black rounded-full p-2">
                <MdShoppingCart size={25} />
              </button>
              <div className="flex justify-center items-center text-[12px] font-bold ring-2 ring-white rounded-full top-[-7px] left-[23px] h-5 min-w-5 p-1 absolute bg-red-600 text-white">
                112
              </div>
            </div>
            <button
              onClick={() => loginOrRegisFunc("login")}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Masuk
            </button>
            <button
              onClick={() => loginOrRegisFunc("register")}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Daftar
            </button>
            <button
              type="submit"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
