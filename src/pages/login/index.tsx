import { FormEvent, useEffect, useRef, useState } from 'react'
import './styless.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { apiAuth } from '../../services/api'
import ImgSenha from '../../assets/senha.svg'
import ImgSenhaOff from '../../assets/senhaOff.svg'

export default function Login() {

const emailRef = useRef<HTMLInputElement>(null)
const senhaRef = useRef<HTMLInputElement>(null)

const navigate = useNavigate()

const [imagemAtual, setImagemAtual] = useState(ImgSenha);
const [mostrarSenha, setMostrarSenha] = useState(false);
function trocarImagem() {

    if (imagemAtual === ImgSenha) {
        setImagemAtual(ImgSenhaOff);
        setMostrarSenha(!mostrarSenha);
    } else {
        setImagemAtual(ImgSenha);
        setMostrarSenha(!mostrarSenha);
    }
}

useEffect(() =>{
    const token =  localStorage.getItem('token')

    if(token){
        navigate('/produtos')
    }
})

async function handleSubmit(element: FormEvent) {
    element.preventDefault()

    if(!emailRef.current?.value || !senhaRef.current?.value){
        toast('Os campos são obrigatórios..', {type: 'info'})
        return 
    }

    try {
        const {data} = await apiAuth.post('/login', {
            email: emailRef.current?.value,
            senha: senhaRef.current?.value
        })
        console.log(data);
        

        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.usuario))
        return navigate('/produtos')

    } catch (error: any) {
        toast(error.response.data, {type: 'info'})
    }
}

return(
    <div className="container">
    <h1 className='tilte'>Login</h1>
    <form onSubmit={handleSubmit} className='container__form'>
        <div className='container__form--input'>
            <label htmlFor="email" className='label__form--login'>E-mail</label>
            <input type="text" name="email" className='input__form--login' ref={emailRef}/>
            <span className='underline'></span>
        </div>

        <div className='container__form--input'>
            <label htmlFor="senha"  className='label__form--login'>Senha</label>
            <div style={{ display: 'flex'}}>
                <input type={mostrarSenha ? "text" : "password"} name="senha" className='input__form--login' ref={senhaRef}/>
                <img className='img__senha' src={imagemAtual} alt="imagem de ocutar a senha" onClick={trocarImagem}  />
            </div>
            <span className='underline'></span>
        </div>

        <button className='button__form--login' type='submit'>Entrar</button>
        <p className='text__form--login'>Primeira vez aqui? <a href="/usuarios" className='link'>Crie uma conta</a></p>
    </form>
</div>
)
}