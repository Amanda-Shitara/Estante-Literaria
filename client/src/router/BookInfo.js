import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import store, { carrinho } from "../store";
import { useDispatch } from "react-redux";
import { TbShoppingCart } from "react-icons/tb";

function BookInfo() {
  let params = useParams();
  const { id } = params;

  const [produto, setProduto] = useState([]);

  function getProduto() {
    fetch(`https://json-server-one-xi.vercel.app/books`)
      .then(resposta => {
        return resposta.json();
      })
      .then(resposta => {
        const vetor = Object.values(resposta);
        setProduto(vetor.find( item => item[0] === parseInt(id)));
        //console.log(produto)
      });
  }

  useEffect(() => {
    getProduto()
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function addToCart(item) {
    const produtosCarrinho = store.getState().produtosCarrinho
    let isInCart = false;
      produtosCarrinho.forEach(el => {
        if (item[0] === el[0]) {
          isInCart = true
        }
      })
    
    if (!isInCart) {
      const it = [...item, 1]
      dispatch(carrinho({type: "ADD_TO_CART", payload: it}))
      navigate("/cart")
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center p-5 bg-gray-100">
      <div className="w-full flex flex-col md:flex-row md:space-x-10 items-center mx-4">
        <div className="relative justify-center md:w-2/5 lg:w-1/4">
          <img id="image" className="w-full object-cover object-center rounded border border-gray-200" src={produto[6]} alt=""/>
        </div>
        <div className="md:w-3/5 lg:w-3/4 md:pr-4">
          <div className="pb-5 border-b-2 border-gray-200 my-5">
            <h1 className="text-3xl font-bold uppercase mb-2 text-gray-900">{produto[1]}</h1>
            <h1 className="text-gray-700 text-xl font-medium uppercase">{produto[2]}</h1>
            <div className="flex divide-x-2 divide-marine my-5">
              <div className="pr-3 text-sm">
                <p className="font-bold">Editora:</p>
                <p className="py-1">{produto[3]}</p>
              </div>
              <div className="pl-3 text-sm">
                <p className="font-bold">Ano de Publicação:</p>
                <p className="py-1">{produto[4]}</p>
              </div>
            </div>
            <p className="text-sm font-bold mb-1">Sinopse:</p>
            <p className="text-sm text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>

          <div className="flex items-center">
            <span className="title-font font-bold text-2xl text-gray-900">R${produto[5]}</span>
            <button className="flex ml-auto text-center font-semibold items-center text-gray-900 bg-feather hover:bg-blue-400 border-0 py-2 px-6 focus:outline-nonerounded focus:ring-1" onClick={() => addToCart(produto)}>
              <TbShoppingCart className="mr-2 text-lg" />
              Adicionar
            </button>
            <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookInfo;