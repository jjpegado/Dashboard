import { FormEvent, useEffect, useRef, useState } from 'react'
import './styles.css'
import { apiAuth } from '../../services/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import ImgSenha from '../../assets/senha.svg'
import ImgSenhaOff from '../../assets/senhaOff.svg'


export default function Register () {

const nomeRef = useRef<HTMLInputElement>(null)
const lojaRef = useRef<HTMLInputElement>(null)
const emailRef = useRef<HTMLInputElement>(null)
const senhaRef = useRef<HTMLInputElement>(null)
const senhaIdenticaRef = useRef<HTMLInputElement>(null)

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

    if(!nomeRef.current?.value || !lojaRef.current?.value
        || !emailRef.current?.value || !senhaRef.current?.value){
        toast('Os campos são obrigatórios..', {type: 'info'})
        return 
    }

    if(senhaRef.current?.value !== senhaIdenticaRef.current?.value){
        toast('As senhas devem ser iguais.', {type: 'info'})
        return
    }

    try {
        await apiAuth.post('/usuarios', {
            nome: nomeRef.current?.value,
            nome_loja: lojaRef.current?.value,
            email: emailRef.current?.value,
            senha: senhaRef.current?.value
        })
        return navigate('/')

    } catch (error: any) {
        toast(error.response.data, {type: 'info'})
    }
}
return (
    <div className="container__register">
        <h1 className='tilte'>Criar Uma Conta</h1>
        <form onSubmit={handleSubmit} className='container__form'>
            <div className='container__form--input'>
            <label htmlFor="nome" className='label__form--register'>Seu nome</label>
            <input type="text" name="nome"  className='input__form--register' ref={nomeRef}/>
            <span className='underline'></span>
            </div>

            <div className='container__form--input'>
            <label htmlFor="nomeDaLoja" className='label__form--register'>Nome Da Loja</label>
            <input type="text" name="NomeDaLoja" className='input__form--register' ref={lojaRef}/>
            <span className='underline'></span>

            </div>

            <div className='container__form--input'>
            <label htmlFor="email" className='label__form--register'>E-mail</label>
            <input type="text" name="email" className='input__form--register' ref={emailRef}/>
            <span className='underline'></span>
            </div>

            <div className='container__form--input'>
            <label htmlFor="senha" className='label__form--register' >Senha</label>
            <div style={{ display: 'flex'}}>
            <input type={mostrarSenha ? "text" : "password"} name="senha" className='input__form--register' ref={senhaRef}/>
            <img className='img__senha' src={imagemAtual} alt="imagem de ocutar a senha" onClick={trocarImagem}  />
            </div>
            <span className='underline'></span>
            </div>

            <div className='container__form--input'>
                <label htmlFor="repitaSenha" className='label__form--register'>Repita a senha</label>
                    <div style={{ display: 'flex'}}>
                        <input type={mostrarSenha ? "text" : "password"} className='input__form--register' ref={senhaIdenticaRef}/>
                        <img className='img__senha' src={imagemAtual} alt="imagem de ocutar a senha" onClick={trocarImagem}  />
                    </div>
                <span className='underline'></span>
            </div>

            <button className='button__form--register' type='submit'>CRIAR CONTA</button>
            <p className='text__form--register'>Já possui uma conta? <a href="/" className='link'>Acesse</a></p>
        </form>
    </div>
)
}