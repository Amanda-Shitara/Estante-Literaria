import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import store, { ProdutosCarrinho, carrinho } from "../store";
import { BsArrowLeftCircle } from "react-icons/bs";
import { TbTrashFilled } from "react-icons/tb";

function ShoppingCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logadoEstado = store.getState().logado;

  const produtosCarrinho = useSelector(ProdutosCarrinho)
  const itens = produtosCarrinho.reduce(function (soma, i) {return soma + i[7];}, 0)
  const preco = produtosCarrinho.reduce(function (soma, i) {return Number(soma) + (Number(i[5])*i[7])}, 0)

  const [totalItem, setTotalItem] = useState(itens)
  const [totalPreco, setTotalPreco] = useState(preco)

  useEffect(() => {
    setTotalItem(itens)
    setTotalPreco(preco)
  }, [produtosCarrinho, itens, preco])

  const esvaziar = () => {
    dispatch(carrinho({ type: "EXCLUDE_ALL_CART" }));
  };

  const removeItemCart = (id) => {
    dispatch(carrinho({ type: "REMOVE_FROM_CART", payload: id }))
  }

  const finalizaCompra = () => {
    if (!logadoEstado) {
      alert("Você precisa estar logado")
      navigate('/auth')
    } else {
      alert("Compra finalizada!! Volte sempre :)")
      esvaziar()
      navigate('/')
    }
  }

  const increment = (id) => {
    dispatch(carrinho({ type: "INCREMENT_PRODUCT", payload: id }))
  }

  const decrement = (id, quant) => {
    if (quant > 1) {
      dispatch(carrinho({ type: "DECREMENT_PRODUCT", payload: id }))
    } else {
      removeItemCart(id)
    }
  }

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-80px)] pb-6">
      <h1 className="mb-5 pt-5 text-gray-900 font-bold text-2xl text-center tracking-wide uppercase">Carrinho de Compras</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:px-4 md:flex md:space-x-4 xl:px-0">
        {/* Itens */}
        <div className="rounded-lg md:w-2/3">
          {produtosCarrinho.length > 0 ?
            produtosCarrinho.map(item =>
          <div className="justify-between mb-4 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" key={item[0]}>
            <img id="imagem" src={item[6]} alt="produto" className="w-full rounded-lg sm:w-40 md:w-32" />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div className="mt-5 sm:mt-0">
                <h2 className="text-lg font-bold text-gray-900">{item[1]} ({item[4]})</h2>
                <p className="mt-1 text-xs text-gray-700">Valor unitário: R${item[5]}</p>
                <p className="mt-1 text-xs text-gray-700">Autor</p>
                <p className="mt-1 text-xs text-gray-700">Editora</p>
              </div>
              <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <div className="flex flex-row items-center sm:justify-end">
                  <button className="rounded-l bg-gray-200 py-1 px-3.5 hover:bg-feather hover:text-white" onClick={() => decrement(item[0], item[7])}> - </button>
                  <h2 className="px-3 py-1 bg-gray-100">{item[7]}</h2>
                  <button className="rounded-r bg-gray-200 py-1 px-3 hover:bg-feather hover:text-white" onClick={() => increment(item[0])}> + </button>
                </div>

                <div className="flex items-center space-x-4 py-1">
                  <p className="text-lg font-bold">R${Number(item[5]) * item[7]}.00</p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer hover:text-red-500" onClick={() => removeItemCart(item[0])}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          ) : 
          <div className="mb-4 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <h2 className="text-2xl font-extrabold">O carrinho está vazio</h2>
          </div>
          }
          <div className="flex justify-between mt-4 mb-10">
            <button type="button" className="flex font-semibold shadow-md bg-white hover:bg-feather text-indigo-600 hover:text-white text-sm border border-feather hover:border-transparent rounded py-1.5 px-4 items-center" onClick={() => navigate("/search")}>
              <BsArrowLeftCircle className="mr-2 h-4 w-4" />
              {produtosCarrinho.length > 0 ? 
                <span>Continuar Compras</span> : <span>Visitar Loja</span>
              }
            </button>
            <button type="button" className={`flex font-semibold shadow-md bg-white hover:bg-red-500 text-red-600 hover:text-white text-sm border border-red-500 hover:border-transparent rounded py-1.5 px-4 items-center ${!produtosCarrinho.length > 0 && 'invisible' }`} onClick={esvaziar}>
              <TbTrashFilled className="mr-2 h-4 w-4" />
              Esvaziar
            </button>
          </div>
        </div>
        {/* Sub total */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">R$ {totalPreco}.00</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Frete</p>
            <p className="text-gray-700">R$ {produtosCarrinho.length > 0 ? 
                <span>15.00</span> : <span>0.00</span>
            }</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-gray-900">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">R$ {produtosCarrinho.length > 0 ? 
                <span>{totalPreco+15}.00</span> : <span>0.00</span>
              }</p>
              <p className="text-sm text-gray-700">({totalItem} {totalItem === 1 ? 'Item' : 'Itens'})</p>
            </div>
          </div>
          {produtosCarrinho.length > 0 && 
              <div>
              <button className="mt-6 w-full rounded-md bg-marine py-1.5 text-white font-semibold hover:bg-forest" onClick={finalizaCompra}>Check out</button>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;