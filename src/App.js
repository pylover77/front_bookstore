import './App.css';
import Form from './form';
import Table from './table';
import Login from './botaologin';
import React, { useEffect, useState } from "react";
import BotaoLogin from './botaologin';
import UserIcon from './user';

function App() {
  const livro =  {
    id : 0,
    nome: '',
    autor: '',
    preco: ''
  }
  //
  const [livros, setLivros] = useState([])
  const [btnCadastrar, setBtnCadastrar] = useState (true)
  const [objLivro, setObjLivro] = useState(livro)
  //
  useEffect(()=>{
      fetch("http://localhost:8080/livros/listar")
      .then(retorno => retorno.json())
      .then(retorno_convertido => setLivros(retorno_convertido))
    }, [])

  
  const cInput = (e) =>{
    setObjLivro({...objLivro, [e.target.name]:e.target.value})
    
  }

  const cadastrar=() =>{
    fetch('http://localhost:8080/livros/cadastrar', {
      method:'post',
      body:JSON.stringify(objLivro),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    }).then(retorno => retorno.json())
      .then(retorno_convertido => {
        if (retorno_convertido.msg !== undefined){
          alert(retorno_convertido.msg) 
        }else{
          setLivros([...livros, retorno_convertido])
          alert('livro cadastrado!')
          cleanForm()
        }
      
    } )
  }

  const remover=() =>{
    fetch('http://localhost:8080/livros/remover/'+objLivro.id, {
      method:'delete',
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    }).then(retorno => retorno.json())
      .then(retorno_convertido => {
        alert(retorno_convertido.msg)
        let vetorTemp = [...livros]
        let indice = vetorTemp.findIndex((p)=>{
          return p.id === objLivro.id
        })
        vetorTemp.splice(indice, 1)
        setLivros(vetorTemp)
        cleanForm()
        
    } )
  }

  const alterar=() =>{
    fetch('http://localhost:8080/livros/alterar', {
      method:'put',
      body:JSON.stringify(objLivro),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    }).then(retorno => retorno.json())
      .then(retorno_convertido => {
        if (retorno_convertido.msg !== undefined){
          alert(retorno_convertido.msg)
        }else{
          
          alert('livro alterado!')
          let vetorTemp = [...livros]
          let indice = vetorTemp.findIndex((p)=>{
            return p.id === objLivro.id
          })
          vetorTemp[indice] = objLivro          
          setLivros(vetorTemp)
          cleanForm()
        }
      
    } )
  }



  //clean form

  const cleanForm = ()=>{
    setObjLivro(livro)
    setBtnCadastrar(true)
  }
  //

  const selectLivro = (indice)=>{
    setObjLivro(livros[indice])
    setBtnCadastrar(false)
  }

  //////////////
  return (
    <div>
      
      <BotaoLogin/>
      <Form botao={btnCadastrar} eventC= {cInput} cadastrar={cadastrar} obj={objLivro} cancelar={cleanForm} remover={remover} alterar={alterar}/>
      <Table vetor={livros} selectL={selectLivro}/>
      <UserIcon/>

    </div>
  );
}

export default App;
