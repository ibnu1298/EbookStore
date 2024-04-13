import React from "react";
import FormSendEbook from "../Fragments/Form/FormSendEbook";
import TabelEbook from "../Fragments/Table/TabelEbook";

const getEbook = async (token: string) => {
  if (token != undefined) {
    const res = await fetch(
      `${process.env.NEXT_URL_PUBLIC}/api/product/ebook/getEbookOrderByName`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const response = await res.json();
    console.log(response);

    if (!response.isSucceeded) {
      return { response };
    }

    return response;
  }
};

const SellerLayouts = async () => {
  const ebook = await getEbook("dwada");
  console.log(ebook);

  return (
    <div className="flex gap-5 m-5 p-5 flex-col lg:flex-row">
      <FormSendEbook />
      <TabelEbook data={ebook} />
    </div>
  );
};

export default SellerLayouts;
