import React from "react";

export default function Pagination({ pageno, onPageChange, totalPages }) {
  function handlePrev() {
    if (pageno > 1) {
        onPageChange(pageno - 1);
    }
  }

  function handleNext() {
    if(pageno < totalPages) {
    onPageChange(pageno + 1);
    }
  }
  return (
    <div className="flex justify-center items-center min-h-20">
      <div className="flex justify-center items-center space-x-2">
        <button
          className="bg-black text-white px-4 py-2 rounded-full cursor-pointer disabled:opacity-50"
          onClick={handlePrev}
          disabled={pageno === 1}
        >
          {"<"}
        </button>
        <div className="bg-gray-700 text-white px-4 py-2 rounded-full">
          {pageno} of {totalPages}
        </div>
        <button
          className="bg-black text-white px-4 py-2 rounded-full cursor-pointer disabled:opacity-50"
          onClick={handleNext}
          disabled={pageno === totalPages}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
