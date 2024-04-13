import React from "react";
import Image from "next/image";
import { MdAddShoppingCart } from "react-icons/md";

const CardEbook = ({ ebook }: { ebook: any }) => {
  console.log(ebook);

  return (
    <div className=" flex flex-col bg-emerald-600 py-2 px-3 h-fit w-40 rounded-lg">
      {/* <div>{ebook.sku}</div> */}
      <div className=" h-52  flex justify-center flex-col items-center ">
        <a href={ebook.ebookLinkImage}>
          <Image
            alt="Ebook Image"
            src={ebook.ebookLinkImage}
            width={500}
            height={500}
            className="w-full rounded-md"
            priority
          />
        </a>
      </div>

      <div className=" text-sm  font-medium line-clamp-2">
        {ebook.ebookName}
      </div>
      <div className="flex justify-between items-center">
        <div>
          <div className="-mb-2 font-extrabold text-lg">Rp.850</div>
          <s className=" font-medium text-red-500 text-[12px]">Rp.17000</s>
        </div>
        <button className="hover:bg-red-500 focus:bg-slate-600 rounded-full flex justify-center items-center">
          <MdAddShoppingCart size={27} className="m-1.5" />
        </button>
      </div>
    </div>
  );
};

export default CardEbook;
