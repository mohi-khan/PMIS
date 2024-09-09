import React, { MouseEventHandler } from 'react';
interface PaginationProps {
    items: number;
    pageSize: number;
    currentPage: number;
    onPageChange: (page: number) => void;
  }
 

    // Call the onPageClick function with the page number
  
const Pagination = ({ items, pageSize, currentPage, onPageChange }: PaginationProps) => {
    const pagesCount = Math.ceil(items / pageSize); // 100/10
    console.log(items)
    if (pagesCount === 1) return null;
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
   console.log(pages)
   return (
    <div>
       <ul className="flex justify-between items-center list-none">
       {pages.map((page) => (
         <li
           key={page}
           className={
             page === currentPage ? "flex justify-center items-center w-8 h-8 border border-gray-300 rounded cursor-pointer bg-green-500" : "flex justify-center items-center w-8 h-8 border border-gray-300 rounded cursor-pointer"
           }
           
         >
            <a onClick={() => onPageChange(page)} className="cursor-pointer" href='#'>
        {page}
      </a>

           
         </li>
       ))}
     </ul>
    </div>
  );
 };
   export default Pagination