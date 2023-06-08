import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from './api';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        username,
        password,
      });
  
      if (response.status === 200) {
        const { jwt } = response.data;
        console.log('Token JWT:', jwt); // Verifica se o token está sendo recebido corretamente
        localStorage.setItem('token', jwt);
        navigate('/'); // Navega para a página principal após o login
      } else {
        console.log('Erro ao autenticar usuário');
      }
    } catch (error) {
      console.log('Erro ao fazer a requisição de autenticação', error);
    }
  };

  
  
  
  
  

  return (
    <form>
      <label>
        Usuario:
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <br />
      <label>
        Senha:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <br />
      <div>
        <Link to="/">
          <button type="submit" onClick={handleLogin}>Login</button>
        </Link>
        <Link to="/registro">
          <button type="submit">Registrar</button>
        </Link>
        <Link to="/">
          <button type="submit">Voltar</button>
          
        </Link>
      </div>
    </form>
  );
}

export default Login;
