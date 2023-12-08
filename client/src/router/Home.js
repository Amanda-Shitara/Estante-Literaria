import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col w-full h-[calc(100vh-80px)] justify-center items-center">
      <div className="w-full h-screen bg-[url('https://i.pinimg.com/originals/67/18/22/671822c2f63dd5f65d8fd15c9710420b.jpg')] bg-cover bg-center">
        <div className="w-full h-full flex flex-col justify-center items-center bg-feather/40 backdrop-brightness-50">
          <div className="text-white text-3xl md:text-4xl font-extrabold w-1/2 text-center mb-5">
            <p className="mb-2">Bem vindo(a) à</p><p>Estante Literária!</p>
          </div>
          <div className="mb-5 px-5 text-center text-gray-200 text-sm md:text-base">
            Explore a riqueza da literatura brasileira em cada livro da nossa estante,<span className="ml-1 inline md:block">onde histórias únicas ganham vida nas páginas.</span>
          </div>
          <Link to="/search" className="text-gray-900 font-bold bg-gradient-to-r from-marine to-feather hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-lg shadow-sleek-grey/50">Visite Nossa Loja</Link>
        </div>
    </div>
    </div>
  );
}

export default Home;
