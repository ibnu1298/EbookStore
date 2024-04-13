import React from "react";
import CardEbook from "../Fragments/Card/CardEbook";

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

    if (!response.isSucceeded) {
      return { response };
    }

    return response;
  }
};
const CatalogEbookLayouts = async () => {
  const response = await getEbook("dwada");
  console.log(response);
  console.log(typeof response);
  response.ebooks.map((ebook: any) => {
    console.log(ebook.sku);
  });

  return (
    <div className="flex justify-center flex-wrap gap-8 my-4 py-5  w-3/4 ">
      {response.ebooks.map((ebook: any) => (
        <>
          <CardEbook ebook={ebook} />
        </>
      ))}
    </div>
  );
};

export default CatalogEbookLayouts;
