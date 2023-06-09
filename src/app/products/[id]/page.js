import React from 'react'
import Image from 'next/image';


//metadata
//product details
async function getProductDetails(id){
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
    const data = await res.json();
    return data;
 }
 export async function generateMetadata({params}){
  const product = await getProductDetails(params.id); 
    return{
      title: product.title,
      description: product.description
    }
 } 

export default async function PeoductDetail({params}) {
    const {id} = params; 
    const product = await getProductDetails(id);
  return (
    <div className=" grid grid-cols-2 w-10/12 mx-auto min-h-screen flex-wrap items-center justify-center">
      <a
        href="#"
        className="items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mt-24"
      >
        {product.images && (
          <Image unoptimized width={600} height={600}
            className="object-cover   rounded-t-lg md:h-auto md:rounded-none md:rounded-l-lg"
            src={product.images[0]}
            alt=""
          />
        )}        
      </a>
      <div className="  justify-between leading-normal ">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
            {product.title ? product.title : "Loading..."}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">
            {product.description ? product.description : "Loading..."}
          </p>
        </div>
    </div> 
  )
}
