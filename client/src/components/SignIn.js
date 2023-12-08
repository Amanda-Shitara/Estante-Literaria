import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import store, { entrar } from "../store";
import { useDispatch } from "react-redux";
import { Spinner } from "flowbite-react";

export default function SignIn() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); //Hook usado para redirecionamento
  const logadoEstado = store.getState().logado;
  const dispatch = useDispatch();

  useEffect(() => {
    if (logadoEstado === true) {
      navigate('/');
    }
  }, [logadoEstado, navigate])

  function login() {
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams({
        username: nome,
        password: senha,
      })
    })
      .then(resposta => {
        return resposta.json();
      })
      .then(resposta => {
        if (typeof resposta.username != "undefined") { //se retornar um usuario
          setLoading(false)
          dispatch(entrar(resposta)) //Faz a mudança do estado global
          navigate("/profile")//redireciona para home
        } else { //se retornar um erro
          //console.log(resposta);
          alert(resposta)
        }
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (nome && senha) {
      //console.log('');
      login();
    } else {
      //console.log('Campo(s) vazio(s)');
      alert('Campo(s) vazio(s)');
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-3xl font-semibold mb-6 text-gray-900 text-center">Acesse sua conta</h1>
      <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nome do usuário</label>
          <input type="text" id="username" name="username" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" onChange={(e) => setNome(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
          <input type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" onChange={(e) => setSenha(e.target.value)} />
        </div>
        <div>
          <button type="submit" className="w-full bg-gray-900 text-white p-2 rounded-md hover:bg-gray-700 focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-colors duration-300">
          {loading ? (
          <>
            <Spinner size="sm" />
            <span className="pl-3 py-1">Carregando</span>
          </>
          ) : (
            <span>Entrar</span>
          )}
          </button>
        </div>
      </form>
    </>
  );
}
