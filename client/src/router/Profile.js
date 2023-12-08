import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { refreshUsuario, sair } from '../store';
import store from '../store';
import userImg from '../assets/profile-img.jpg'
import { Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { BsArrowRight } from "react-icons/bs";

export function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [validado, setValidado] = useState(false);
  const logadoEstado = store.getState().logado;
  const [updateToggle, setUpdateToggle] = useState(false);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [erro, setErro] = useState("");

  const [editOpen, setEditOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!logadoEstado) {
      navigate("/auth");
    } else {
      setUsuario(store.getState().usuario);
      setEmail(store.getState().email);
    }
  }, [logadoEstado, navigate]);

  const desconectar = () => {
    dispatch(sair());
    navigate("/");
  };

  //Verifica se a senha está correta para alterações.
  const autenticacaoPost = () => {
    fetch('http://localhost:3001/usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams({
        username: usuario,
        password: password,
      })
    })
    .then(resposta => {
      return resposta.json();
    })
    .then(resposta => {
      if (resposta.username === usuario) { //se retornar sucesso
        setValidado(true);
        setErro("");
      }
      else{
        setErro("Senha incorreta!");
    }
    });
  }

  //Realiza a deleção.
  const deleteDelete = (e) => {
    e.preventDefault();
    autenticacaoPost();
    if(validado){
      fetch('http://localhost:3001/usuario', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams({
        username: usuario
      })
    })
      .then(resposta => {
        return resposta.json();
      })
      .then(resposta => {
        if (resposta === "Usuário removido com sucesso!") { //se retornar sucesso
          alert(resposta);
          desconectar();
        }
        else{
          setErro("Não foi possível realizar a exclusão!");
        }
      });
    }
  }

  //Realiza a atualização.
  const updatePut = (e) => {
    e.preventDefault();
    autenticacaoPost();
    if(checked === false || newPassword.length === 0) {
      setNewPassword(password)
    }
    if(validado){
      fetch('http://localhost:3001/usuario', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams({
        username: usuario,
        email: email,
        password: newPassword,
      })
    })
      .then(resposta => {
        return resposta.json();
      })
      .then(resposta => {
        if (resposta === "Usuário atualizado com sucesso!") { //se retornar sucesso
          alert(resposta)
          setNewPassword("");
          setPassword("");
          setChecked(false);
          setUpdateToggle(false);
          dispatch(refreshUsuario({payload: email}))
        }
        else{
          setErro(resposta);
        }
      });
    }
  }

  return (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 md:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 md:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <img src={userImg} alt="profile" className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" />
                  <h1 className="text-xl font-bold">{usuario}</h1>
                  <p className="text-gray-600">{email}</p>
                    <div className="mt-6 flex flex-wrap gap-4 justify-center">
                      <button type="button" className="bg-cyan-700 hover:bg-cyan-800 text-white py-2 px-4 rounded md:w-full" onClick={() => {setChecked(false); setNewPassword(""); setEditOpen(true)}}>Editar</button>
                      <button type="button" className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded md:w-full" onClick={() => setDeleteToggle(!deleteToggle)}>Excluir Conta</button>
                    </div>
                </div>
              </div>
            </div>
            {
              editOpen && (
                <Modal show={editOpen} size="md" dismissible 
                onClose={() => {setEditOpen(false); setEmail(store.getState().email); setErro("")}} popup>
                  <Modal.Header />
                  <Modal.Body>
                    <div className="space-y-6">
                      <h3 className="text-xl font-medium text-gray-900">Editar Dados</h3>
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="usuario" value="Usuário" />
                        </div>
                        <TextInput
                          id="usuario"
                          placeholder="Usuário"
                          value={usuario}
                          onChange={(e) => setUsuario(e.target.value)}
                        />
                      </div>
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="email" value="E-mail" />
                        </div>
                        <TextInput
                          id="email"
                          placeholder="E-mail"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <div className="mb-2 block">
                          <Checkbox onClick={() => setChecked(!checked)} />
                          <Label className="ml-2" value="Alterar Senha" />
                        </div>
                      </div>
                      {checked ? 
                        <div>
                          <div className="mb-2 block">
                            <Label htmlFor="new" value="Nova Senha" />
                          </div>
                          <TextInput id="new" placeholder="Nova Senha" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </div>
                      : <></>
                      }
                      <div className="w-full">
                        <button className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-lg" onClick={() => {setUpdateToggle(true); setEditOpen(false)}}>Confirmar</button>
                      </div>
                      <p className="text-red-700 italic">{erro}</p>
                    </div>
                  </Modal.Body>
                </Modal>
              )
            }
            {
              deleteToggle && (
                <Modal show={deleteToggle} size="md" dismissible 
                onClose={() => {setDeleteToggle(false); setEmail(store.getState().email); setErro("")}} popup>
                  <Modal.Header />
                  <Modal.Body>
                    <div className="space-y-6">
                      <h3 className="text-xl font-medium text-gray-900">Excluir Conta</h3>
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="senha" value="Senha Atual" />
                        </div>
                        <TextInput id="senha" placeholder="Senha Atual" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                      </div>
                      <div className="w-full">
                        <button className=" bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg" onClick={e => deleteDelete(e)}>Excluir</button>
                      </div>
                      <p className="text-red-700 italic">{erro}</p>
                    </div>
                  </Modal.Body>
                </Modal>
              )
            }
            {
              updateToggle && (
                <Modal show={updateToggle} size="md" dismissible 
                onClose={() => {setUpdateToggle(false); setErro("")}} popup>
                  <Modal.Header />
                  <Modal.Body>
                    <div className="space-y-6">
                      <h3 className="text-xl font-medium text-gray-900">Editar Conta</h3>
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="senha" value="Senha Atual" />
                        </div>
                        <TextInput id="senha" placeholder="Senha Atual" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                      </div>
                      <div className="w-full">
                        <button className=" bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg" onClick={e => updatePut(e)}>Confirmar</button>
                      </div>
                      <p className="text-red-700 italic">{erro}</p>
                    </div>
                  </Modal.Body>
                </Modal>
              )
            }
            <div className="col-span-4 md:col-span-9">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Sobre Mim</h2>
                <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas suscipit. Nunc finibus vel ante id euismod. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam erat volutpat. Nulla vulputate pharetra tellus, in luctus risus rhoncus id.</p>

                <h3 className="font-semibold text-center mt-3 -mb-2">Minhas redes sociais</h3>
                <div className="flex justify-center items-center gap-6 my-6">
                  <button className="text-gray-700 hover:text-feather" aria-label="Visit TrendyMinds YouTube" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-6">
                      <path fill="currentColor"
                        d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z">
                      </path>
                    </svg>
                  </button>
                  <button className="text-gray-700 hover:text-feather" aria-label="Visit TrendyMinds Facebook" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="h-6">
                      <path fill="currentColor"
                        d="m279.14 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z">
                      </path>
                    </svg>
                  </button>
                  <button className="text-gray-700 hover:text-feather" aria-label="Visit TrendyMinds Instagram" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-6">
                      <path fill="currentColor"
                        d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z">
                      </path>
                    </svg>
                  </button>
                  <button className="text-gray-700 hover:text-feather" aria-label="Visit TrendyMinds Twitter" target="_blank">
                    <svg className="h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="currentColor"
                        d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z">
                      </path>
                    </svg>
                  </button>
                </div>

                <h2 className="text-xl font-bold mt-6 mb-4">Listas de Leitura</h2>
                <div className="mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-bold">Favoritos</span>
                    <p>
                      <span className="text-gray-600 mr-1">Criado em</span>
                      <span className="text-gray-600 font-semibold">2022</span>
                    </p>
                  </div>
                  <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas suscipit.</p>
                  <button type="button" className="text-gray-900 bg-feather hover:bg-feather focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-2 mt-2 text-center inline-flex items-center">
                    Veja mais
                    <BsArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
                <hr className="bg-gray-400"/>
                <div className="my-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-bold">Poesia Brasileira</span>
                    <p>
                      <span className="text-gray-600 mr-1">Criado em</span>
                      <span className="text-gray-600 font-semibold">2022</span>
                    </p>
                  </div>
                  <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas suscipit.</p>
                  <button type="button" className="text-gray-900 bg-feather hover:bg-feather focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-2 mt-2 text-center inline-flex items-center">
                    Veja mais
                    <BsArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
                <hr className="bg-gray-400"/>
                <div className="mt-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-bold">Literatura Infantojuvenil Nacional</span>
                    <p>
                      <span className="text-gray-600 mr-1">Criado em</span>
                      <span className="text-gray-600 font-semibold">2023</span>
                    </p>
                  </div>
                  <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas suscipit.</p>
                  <button type="button" className="text-gray-900 bg-feather hover:bg-feather focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-2 mt-2 text-center inline-flex items-center">
                    Veja mais
                    <BsArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile;
