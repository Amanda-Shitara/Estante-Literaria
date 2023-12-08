import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-80px)] justify-center items-center bg-gray-100">
      <h1 className="text-9xl font-extrabold text-sleek-grey tracking-widest">404</h1>
      <div className="bg-forest px-2 text-base text-white rounded rotate-12 absolute">
        Página não encontrada
      </div>
      <button className="mt-5">
        <div
          className="relative inline-block text-base font-medium text-gray-900 group focus:outline-none focus:ring"
        >
          <span
            className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-forest group-hover:translate-y-0 group-hover:translate-x-0"
          ></span>

          <span className="relative block px-8 py-3 bg-marine border border-feather">
            <Link to="/">Voltar ao início</Link>
          </span>
        </div>
      </button>
    </div>
  );
}

export default PageNotFound;
