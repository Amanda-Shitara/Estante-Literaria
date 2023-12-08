import React from "react";
import { useEffect, useState } from "react";
import BookCard from './BookCard';
import { TbSearch } from "react-icons/tb";

function BookList() {
  const [produtos, setProdutos] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchFilter, setSearchFilter] = useState(1); // title(1), author(2)

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function getProdutos() {
    setLoading(true);
    fetch(`https://json-server-one-xi.vercel.app/books`)
      .then(resposta => {
        return resposta.json();
      })
      .then(resposta => {
        const vetor = Object.values(resposta);
        setProdutos(vetor);
        setLoading(false);
      });
  }

  useEffect(() => {
    getProdutos()
  }, [])

  const filterHandler = (opt) => {
    setSearchFilter(opt);
    setIsOpen(false);
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
      const filteredData = produtos.filter((item) => {
        return Object.values(item[searchFilter]).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
    }
    else{
      setFilteredResults(produtos)
    }
  }

  return (
    <>
    <nav className="fixed w-full z-20 start-0">
      <div className="items-center justify-center bg-marine shadow-md w-full h-36 p-5">
        <h1 className="mb-5 text-gray-900 font-bold text-2xl text-center tracking-wide uppercase">Livros</h1>
        <div className="flex md:px-6">
          <button
            id="dropdown-button"
            data-dropdown-toggle="dropdown"
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:outline-none"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            {searchFilter === 2 ? (
              <span>Autor</span>
            ) : (
              <span>Título</span>
            )}
            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>
          <div id="dropdown" className={`${ !isOpen && "hidden" } absolute mt-11 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow`} >
            <ul className="py-1 text-sm text-gray-700" aria-labelledby="dropdown-button">
              <li className="cursor-pointer inline-flex w-full px-4 py-2 hover:bg-gray-100" onClick={() => filterHandler(1)}>
                Título
              </li>
              <li className="cursor-pointer inline-flex w-full px-4 py-2 hover:bg-gray-100" onClick={() => filterHandler(2)}>
                Autor
              </li>
            </ul>
          </div>
          <div className="relative w-full rounded-r-full">
            <input
              type="text"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 border-s-gray-50 border-s-2 rounded-r-full border border-gray-300 focus:ring-feather focus:border-fering-feather"
              placeholder="Digite aqui o que está procurando :)"
              value={searchInput}
              onChange={(e) => searchItems(e.target.value)}
              required
            />
            <div
              className="absolute top-0 end-0 py-2.5 px-3 text-sm font-medium h-full rounded-e-full focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <TbSearch
                color="gray"
                size={21}
              />
              <span className="sr-only">Search</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div className="flex flex-col w-11/12 ml-5 h-auto pt-32">
      <div className="mt-6 bg-brand-primary">
        <div className="flex flex-wrap w-full justify-evenly">
          {loading ? (
            <div className="flex justify-center items-center h-full py-20">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className="animate-spin  w-24 h-24 stroke-slate-500">
                <path d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12">
                </path>
              </svg>
            </div>
          ) : searchInput.length > 1 ? (
            filteredResults.map((item) => {
              return (
                <BookCard item={item} key={item} />
              )
            })
          ) : (
            produtos.map((item) => {
              return (
                <BookCard item={item} key={item} />
              )
            })
          )}
        </div>
      </div>
    </div>
  </>
  )
}

export default BookList;
