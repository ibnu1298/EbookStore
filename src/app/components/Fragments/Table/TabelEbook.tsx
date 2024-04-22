"use client";
import React, { useState } from "react";
import { GiCycle } from "react-icons/gi";

const TabelEbook = ({ data }: { data: any }) => {
  const [value, setValue] = useState("");
  const [orderByName, setOrderByName] = useState(true);

  function handleChange(e: any) {
    setValue(e.target.value);
  }
  function orderByFunc() {
    if (orderByName) {
      setOrderByName(false);
    } else {
      setOrderByName(true);
    }
  }
  const filterEbookName = data.ebooks.filter((ebook: any) =>
    ebook.ebookName.toLowerCase().includes(value.toLowerCase())
  );
  const filterSKU = data.ebooks.filter((ebook: any) =>
    ebook.sku.toString().includes(value.toString())
  );

  return (
    <div className="md:w-[800px] w-full bg-gray-700/50 px-9 rounded-lg backdrop-blur-sm">
      <div className="flex flex-col gap-3 py-9">
        {" "}
        <div className="flex flex-col gap-2 md:w-72">
          <div className="text-start text-white">
            Search By {orderByName ? "SKU" : "Name"}
          </div>
          <div
            style={{ textAlign: "center" }}
            className="flex items-center gap-2"
          >
            <input
              value={value}
              onInput={handleChange}
              className=" text-md text-white rounded-lg block w-full p-2.5 bg-gray-700/50 border-2 border-white  backdrop-blur-sm  py-2 px-3 placeholder:text-white"
              placeholder={`Tuliskan ${orderByName ? "SKU" : "Nama Ebook"}`}
            />
            <div
              className="bg-white p-2 rounded-full hover:bg-gray-400"
              onClick={orderByFunc}
            >
              <GiCycle />
            </div>
          </div>
        </div>
        <div className="text-white">
          Show {orderByName ? filterSKU.length : filterEbookName.length} item
        </div>
        <table className="text-white">
          <thead className="bg-gray-700/50  text-lg">
            <tr>
              <th className="border-2 p-3 w-5">SKU</th>
              <th className="border-2 p-3">E-Book Name</th>
            </tr>
          </thead>
          <tbody>
            {!orderByName ? (
              <>
                {filterEbookName.slice(0, 20).map((ebook: any) => (
                  <tr key={ebook.id}>
                    <td className="text-center border-2 p-2">{ebook.sku}</td>
                    <td className="border-2 p-2">{ebook.ebookName}</td>
                  </tr>
                ))}
              </>
            ) : (
              <>
                {filterSKU.slice(0, 20).map((ebook: any) => (
                  <tr key={ebook.id}>
                    <td className="text-center border-2 p-2 ">{ebook.sku}</td>
                    <td className=" border-2 p-2">{ebook.ebookName}</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelEbook;
