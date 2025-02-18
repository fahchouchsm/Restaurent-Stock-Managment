import React from 'react';
import company from '../Data/companyData';
import { pages } from '../Data/pages';
import { Link } from 'react-router-dom';

export interface pageUi {
  name: string;
  url: string;
}

const SideBar: React.FC = () => {
  return (
    <nav className="bg-gray-700 w-3/12  h-screen flex-2 text-white flex flex-col ">
      <h2 className="font-extrabold text-3xl my-10 mx-auto ">{company.name}</h2>
      <ul className="flex flex-col gap-4 lg:text-lg xl:text-3xl justify-center px-2">
        {pages.map((page, i) => {
          return (
            <li key={i}>
              <Link to={page.url}>
                <div className="flex gap-4 hover:bg-gray-600 pb-2 pt-2.5 px-3 rounded-xl transition duration-300 ease-in-out">
                  <div className="">{page.icon}</div>
                  <div className="-translate-y-1">{page.name}</div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideBar;
