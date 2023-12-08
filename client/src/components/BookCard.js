import React from "react";
import { TbShoppingCart } from 'react-icons/tb'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import store, { carrinho } from "../store"

function BookCard(props) {
  const urlProduto = `/search/${props.item[0]}`;
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
    <>
      <div className="grid-cols-3 w-64 m-5 rounded-lg shadow-md bg-white">

        <Link to={urlProduto} className="w-full ">
          <img id="imagem" src={props.item[6]} alt="produto" className="w-48 h-56 p-3 m-auto" />
        </Link>

        <div className="px-5 pb-5">

          <Link to={urlProduto}>
            <p id="descricao" className="text-xl font-semibold tracking-tight text-gray-900">{props.item[1]}</p>
          </Link>

          <div className="flex items-center mt-2.5 mb-5">
            <span className="py-0.5 text-forest text-xs font-semibold">{props.item[2]}</span>
          </div>

          <div className="flex flex-row-reverse justify-between items-center">
            <button type="button" className="px-4 py-2 mr-2 text-xs text-center font-semibold rounded flex items-center text-gray-900 bg-feather hover:bg-blue-400 focus:ring-1" onClick={() => addToCart(props.item)}>
              <TbShoppingCart className="mr-2 text-lg" />
              Adicionar
            </button>
            <p id="preco" className="text-xl font-semibold tracking-tight text-gray-900">R${props.item[5]}</p>

          </div>
        </div>
      </div>
    </>
  );
}

export default BookCard;
