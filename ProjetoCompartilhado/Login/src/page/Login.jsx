import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import "../style/Login.css";
import { useNavigate } from 'react-router-dom';


function Login() {
  const [error] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cpf || !senha) {
      toast.error('Preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/', { cpf, senha });
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/Crud');
      toast.success('Login realizado com sucesso!');
      
    } catch (error) {

      if (error.response.status === 401) {
        toast.error('CPF ou senha incorretos.');
      } else {
        toast.error('Ocorreu um erro. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className="body-login">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Admin</h1>
          <div className="input-box">
            <input
              name="cpf"
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              name="senha"
              type={mostrarSenha ? "text" : "password"} 
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            {mostrarSenha ? (
              <FaEyeSlash className="icon" onClick={() => setMostrarSenha(false)} />
            ) : (
              <FaEye className="icon" onClick={() => setMostrarSenha(true)} />
            )}
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />Continuar logado
            </label>
            <a href="sem">Esqueceu a Senha?</a>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit">Entrar</button>
        </form>
        <ToastContainer autoClose={3000} position="bottom-left"/>
      </div>
    </div>
  );
}

export default Login;
