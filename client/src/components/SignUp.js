import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import store from "../store";
import { Spinner } from "flowbite-react";

export default function SignUp({handleView}) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); //Hook usado para redirecionamento
  const logadoEstado = store.getState().logado;

  useEffect(() => {
    if (logadoEstado) {
      navigate('/');
    }
  }, [logadoEstado, navigate])

  function postCadastro() {
    fetch('http://localhost:3001/cadastro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams({
        username: nome,
        email: email,
        password: senha,
      })
    })
    .then(resposta => {
      return resposta.json();
    })
    .then(resposta => {
      if (resposta === "Usuário cadastrado com sucesso!") {
        alert(resposta);  
        setLoading(false);
        handleView();
      }
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (nome && email && senha) {
      //console.log('');
      postCadastro();
    } else {
      //console.log('Campo(s) vazio(s)');
      alert('Campo(s) vazio(s)');
      setLoading(false);
    }
  }  
  
  return (
    <>
      <h1 className="text-3xl font-semibold mb-6 text-gray-900 text-center">Crie sua conta</h1>
      <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">Por favor, preencha os campos a seguir</h1>
      <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nome do usuário</label>
          <input type="text" id="username" name="username" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" onChange={(e) => setNome(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
          <input type="text" id="email" name="email" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" onChange={(e) => setEmail(e.target.value)} />
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
            <span>Cadastrar</span>
          )}
          </button>
        </div>
      </form>   
    </>
  );
}
