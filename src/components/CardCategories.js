import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'next/image';

export default function CardCategories({title,image}) {
  return (
     
    
    <div>
    <div className="flow-root">
     <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
     <li className="py-3 sm:py-4">
         <div className="flex items-center space-x-4">
             <div className="flex-shrink-0">
                 <Image unoptimized width={600} height={600} className="w-8 h-8 rounded-full" src={image?image:"Unknow"} alt="Neil image"/>
             </div>
             <div className="flex-1 min-w-0">
                 <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    
                 </p>
                 <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {title? title:" Unknow"}
                 </p>
             </div>                
         </div>
     </li>
     </ul>
   </div>   

 </div>

     
  )
}
