import { createUrl } from "@/app/lib/utils";
import { Button, Pagination } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const PaginationNextUI = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageSearchParams = new URLSearchParams(searchParams.toString());
  pageSearchParams.set("page", currentPage.toString());
  const pageURL = createUrl(pathname, pageSearchParams);
  console.log(pageURL);

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <p className="text-small text-default-500">
        Selected Page: {currentPage}
      </p>
      <Pagination
        total={10}
        color="secondary"
        page={currentPage}
        onChange={setCurrentPage}
        classNames={{
          wrapper: "gap-0 overflow-visible h-8 rounded ",
          item: "w-8 h-8 text-small rounded-md bg-transparent m-2 bg-gray-600 text-white font-medium active:border-none",
          cursor:
            "bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
        }}
      />
      <div className="flex gap-5">
        <Button
          size="sm"
          variant="flat"
          onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
          className="bg-slate-400 px-3 rounded"
        >
          Previous
        </Button>
        <Button
          size="sm"
          variant="flat"
          className="bg-slate-400 px-3 rounded"
          onPress={() =>
            setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaginationNextUI;
