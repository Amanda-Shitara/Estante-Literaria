import { Link, useNavigate } from "react-router-dom";
import { TbUserCircle } from "react-icons/tb"
import store, { Logado, ProdutosCarrinho, Usuario, sair } from "../store"

import logo from '../assets/logo.svg'
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from 'flowbite-react';

export function Menu() {
  const user = useSelector(Usuario)
  const logado = useSelector(Logado)
  const produtosCarrinho = useSelector(ProdutosCarrinho)
  const email = store.getState().email

  const [usuarioLogado, setUsuarioLogado] = useState(user)
  const [autenticado, setAutenticado] = useState(logado)
  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setUsuarioLogado(user)
  }, [user]);

  useEffect(() => {
    setAutenticado(logado)
  }, [logado]);

  const desconectar = (event) => {
    event.preventDefault();
    dispatch(sair());
    navigate('/');
  };

  let dropdownRef = useRef(null);
  let bttnRef = useRef(null);

  // Handle Dropdown
  useEffect(() => {
    let handler = (e) => {
      if (
        !dropdownRef.current?.contains(e.target) &&
        !bttnRef.current?.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [dropdownRef, bttnRef]);

  return (
    <nav className="w-full sticky top-0 z-50 bg-gray-100 shadow-sm shadow-gray-100">
      <div className={`flex flex-wrap items-center justify-between mx-auto px-2 pt-4 md:py-4 ${!isOpen && 'pb-4'}`}>
        <div className="flex items-center px-2">
          <Link
            to="/"
            className="flex items-center"
          >
            <img
              className="w-10 h-10"
              src={logo}
              alt="logo"
              width={10}
              height={10}
            />
            <span className="ml-2 block self-center text-lg font-semibold uppercase">
              <p className="-mb-2 text-transparent bg-clip-text bg-gradient-to-r from-forest to-marine">Estante</p>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-marine">Literária</p>
            </span>
          </Link>
        </div>

        <div className="flex md:order-2 px-2 items-center">
          <Link to="/cart" className={`flex items-center text-gray-900 hover:text-sleek-grey mr-6 ${autenticado && '-mr-1 md:mr-6'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {produtosCarrinho.length > 0 &&
              <span className="flex absolute -mt-5 ml-4">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
            }
          </Link>
          {
            autenticado ?
              <Dropdown inline placement="bottom-end" label="" className={`${autenticado && 'hidden md:block'} bg-gray-100`} dismissOnClick={false} renderTrigger={() => <button type="button" className="hidden md:block"><TbUserCircle size={28} className="text-gray-900 hover:text-sleek-grey" /></button>}>
                <Dropdown.Item>
                  <div className="text-sm text-start text-gray-900 w-full">
                    <span className="block">{usuarioLogado}</span>
                    <span className="block truncate font-medium">{email}</span>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider className="bg-sleek-grey mx-2" />
                <Dropdown.Item>
                  <Link to="/profile" className="text-center text-sm font-bold text-gray-900 w-full block py-1 px-2 rounded hover:bg-marine hover:text-white">
                    Meu Perfil
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                <button className="text-center text-sm font-bold text-red-600 w-full block py-1 px-2 rounded hover:bg-red-600 hover:text-white" type='button' onClick={desconectar}>Sair</button>
                </Dropdown.Item>
              </Dropdown>
            :
              <Link to="/auth" className="
              text-sm text-center bg-transparent hover:bg-marine text-forest font-semibold hover:text-white py-2.5 px-4 border border-marine hover:border-transparent rounded-lg focus:ring-4 focus:outline-none focus:ring-green-300 md:mr-0">Fazer login</Link>
          }
          <button ref={bttnRef} data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 ml-4 w-8 h-8 justify-center text-sm text-gray-900 rounded-lg md:hidden hover:text-sleek-grey focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false" onClick={() => setIsOpen(!isOpen)}>
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>

        <div ref={dropdownRef} className={`${!isOpen && 'hidden'} items-center justify-between w-full md:flex md:w-auto md:order-1`}>
          <ul className="flex flex-col p-4 md:p-0 mt-4 -mx-2 font-medium border border-gray-100 rounded-b-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-gray-100">
            {
              autenticado && 
              <>
                <li className="md:hidden">
                  <Link to="/profile" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-marine hover:text-white md:hover:bg-transparen md:p-0" aria-current="page">Meu Perfil</Link>
                </li>
                <li className="md:hidden order-last">
                  <span className="block py-2 pl-3 pr-4 text-red-600 rounded hover:bg-red-600 hover:text-white md:hover:bg-transparent md:p-0" aria-current="page" onClick={desconectar}>Sair</span>
                </li>
              </>
            }
            <li>
              <Link to="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-marine hover:text-white md:hover:bg-transparent md:hover:text-forest md:hover:underline md:hover:underline-offset-4 md:hover:decoration-marine md:hover:decoration-2 md:p-0" aria-current="page">Home</Link>
            </li>
            <li>
              <Link to="/about" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-marine hover:text-white md:hover:bg-transparent md:hover:text-forest md:hover:underline md:hover:underline-offset-4 md:hover:decoration-marine md:hover:decoration-2 md:p-0">Sobre</Link>
            </li>
            <li>
              <Link to="/search" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-marine hover:text-white md:hover:bg-transparent md:hover:text-forest md:hover:underline md:hover:underline-offset-4 md:hover:decoration-marine md:hover:decoration-2 md:p-0">Livros</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
