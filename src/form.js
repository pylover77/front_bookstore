function Form({botao, eventC, cadastrar, obj, cancelar, remover, alterar}){
    return(
        <form>
            <input type='text' value={obj.nome} onChange= {eventC } name='nome' placeholder='Nome' className='form-control'/>
            <input type='text' value={obj.autor} onChange= {eventC } name='autor' placeholder='Autor' className='form-control'/>
            <input type='text' value={obj.preco} onChange= {eventC } name='preco' placeholder='Preco' className='form-control'/>
            {
                botao
                ?
                <input type='button' onClick={cadastrar} value='Cadastrar' className='btn btn-primary'/>
                :
                <div>
                <input type='button' onClick={alterar} value='Alterar' className='btn btn-warning'/>
                <input type='button' onClick={remover} value='Remover' className='btn btn-danger'/>
                <input type='button' onClick={cancelar} value='Cancelar' className='btn btn-secondary'/>
                </div>
            }

        </form>
    )
}

export default Form