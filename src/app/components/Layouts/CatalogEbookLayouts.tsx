"use client";
import React, { useEffect, useState } from "react";
import CardEbook from "../Fragments/Card/CardEbook";
import PaginationNextUI from "../Elements/Pagination/PaginationNextUI";
import { usePathname } from "next/navigation";

const CatalogEbookLayouts = ({ ebooks }: { ebooks: any }) => {
  const [itemPerPage, setItemPerPage] = useState(20);
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState((page - 1) * itemPerPage);
  console.log(itemPerPage);
  console.log(skip);
  console.log(page);
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="flex justify-center flex-col items-center my-4 py-5 gap-8">
      <div>Cari</div>
      <div className="flex justify-center flex-wrap gap-2  w-3/4 ">
        {ebooks.slice(skip, itemPerPage + skip).map((ebook: any) => (
          <div key={ebook.sku}>
            <CardEbook ebook={ebook} />
          </div>
        ))}
      </div>
      <PaginationNextUI />
    </div>
  );
};

export default CatalogEbookLayouts;
