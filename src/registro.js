import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

function Registro() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [clientes, setClientes] = useState([]);
  const cliente = {
    id: 0,
    username: '',
    password: ''
  }
  useEffect(() => {
    fetch("http://localhost:8080/auth/listar")
      .then(retorno => retorno.json())
      .then(retorno_convertido => setClientes(retorno_convertido))
  }, [])

  const [objCliente, setObjCliente] = useState(cliente)


  const bInput = (e) => {
    setObjCliente({ ...objCliente, [e.target.username]: e.target.value })

  }

  const cadastrarC = () => {
    fetch('http://localhost:8080/auth/register', {
      method: 'post',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(retorno => retorno.json())
      .then(retorno_convertido => {
        if (retorno_convertido.msg !== undefined) {
          alert(retorno_convertido.msg)
        } else {

          setClientes([...clientes, retorno_convertido])
          alert('cliente cadastrado!')
          cleanForm()
        }

      })
  }

  const cleanForm = () => {
    setObjCliente(cliente)

  }

  return (
    <form >

      <h1>Registro</h1>
      <label>
        Nome de usuario:
        <input type="text" name='username' placeholder='username' value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <br />

      <br />
      <label>
        Senha:
        <input type="password" name='password' placeholder='password' value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <br />
      <Link to="/">
        <button type="submit" value='Voltar'>Voltar</button>
      </Link>
      <button type="submit" onClick={cadastrarC} value='Cadastrar'>Registro</button>

    </form>


  );


}

export default Registro;