"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MdAddShoppingCart } from "react-icons/md";
import { LuCopy } from "react-icons/lu";
import { LuCopyCheck } from "react-icons/lu";

const CardEbook = ({ ebook }: { ebook: any }) => {
  const [copyCheckStatus, setCopyCheckStatus] = useState(false);
  const [opacity, setOpacity] = useState("opacity-0");
  function copyValue(sku: string) {
    navigator.clipboard.writeText(sku);
    setCopyCheckStatus(true);
    setOpacity("opacity-100");
    setTimeout(() => {
      setOpacity("opacity-0");
      setCopyCheckStatus(false);
    }, 1500);
  }
  return (
    <div className=" flex flex-col gap-2 bg-gray-600 p-2 h-fit w-40 rounded-lg drop-shadow-[0_15px_15px_rgba(0,0,0,0.25)]">
      {/* <div>{ebook.sku}</div> */}
      <div className=" h-52  flex justify-center flex-col items-center ">
        <a href={ebook.ebookLinkImage}>
          <Image
            alt="Ebook Image"
            src={ebook.ebookLinkImage}
            width={500}
            height={500}
            className="w-full rounded-md "
            priority
          />
        </a>
      </div>

      <div className="text-white text-[12px] font-normal line-clamp-2">
        {ebook.ebookName}
      </div>
      <hr />
      <div
        className={`z-10 bg-slate-200 px-4 rounded-md text-sm border-2 border-black/50 mt-[263px] font-normal transition duration-500 ${opacity} absolute `}
      >
        {ebook.sku} Copied
      </div>
      <div className="flex justify-between items-center">
        <div className="text-white text-[12px] font-normal ">
          No. {ebook.sku}
        </div>
        <button onClick={() => copyValue(ebook.sku)}>
          {copyCheckStatus ? (
            <LuCopyCheck color="white" size={17} />
          ) : (
            <LuCopy color="white" size={17} />
          )}
        </button>
      </div>
    </div>
  );
};

export default CardEbook;
