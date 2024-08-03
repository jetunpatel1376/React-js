import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";

export default function Product() {
  const [product, setProduct] = useState([]);
  const [pageno, setPageno] = useState(1);

  const productperpage = 4;
  const lastindex = pageno * productperpage;
  const firstindex = lastindex - productperpage;
  const currentProduct = product.slice(firstindex, lastindex);
  const totalPages = Math.ceil(product.length / productperpage);
  


  async function getData() {
    try {
      const response = await axios
        .get(`https://api.escuelajs.co/api/v1/products`)
        .then((response) => {
          setProduct(response.data);
        });
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getData();
  }, []);


  function handleChange(pageNumber){
    setPageno(pageNumber);
  }

  return (
    <>
      <div className="p-11 bg-gray-100 min-h">
        {product.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProduct.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={product.images}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {product.title}
                  </h2>
                  <h3 className="text-lg text-gray-700">${product.price}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
      <Pagination pageno={pageno} totalPages={totalPages} onPageChange={handleChange} />
    </>
  );
}
