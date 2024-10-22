import './styles.css'
import ImgSenha from '../../assets/senha.svg'
import ImgSenhaOff from '../../assets/senhaOff.svg'
import { NavBar } from "../../components/Navbar";
import { useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { apiAuth } from '../../services/api';


export function EditProfile() {
    const navigate = useNavigate()
    
    const usuario = localStorage.getItem('user')
    const user = JSON.parse(usuario)
    const token =  localStorage.getItem('token')

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
        if(!token){
            navigate('/')
        }
    })

    const nomeRef = useRef<HTMLInputElement>(null)
    const NomeDaLojaRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const senhaRef = useRef<HTMLInputElement>(null)
    const senhaIdenticaRef = useRef<HTMLInputElement>(null)
    
    async function handleSubmit(element: FormEvent) {
        element.preventDefault()

        if(senhaRef.current?.value !== senhaIdenticaRef.current?.value){
            toast('As senhas devem ser iguais.', {type: 'info'})
            return
        }
        try {
            await apiAuth.put('/perfil', {
                nome: nomeRef.current?.value,
                nome_loja: NomeDaLojaRef.current?.value,
                email: emailRef.current?.value,
                senha: senhaRef.current?.value
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            

            localStorage.setItem('user', JSON.stringify({
                ...user,
                nome: nomeRef.current?.value,
                nome_loja: NomeDaLojaRef.current?.value,
                email: emailRef.current?.value
            }))
            return navigate('/perfil')
    
        } catch (error: any) {
            toast(error.response.data, {type: 'info'})
        }
    }

    function handleButtonClick(){
        navigate('/produtos');
    }
    return(
        <>
        <NavBar />
            <h3 className='title__products'>{user.nome_loja}</h3>
            <h5 className='sube__title--products'>Editar Perfil</h5>
            <form className="form__addproduct">
                <div className="container__addproduct">
                    <label className='label__addproduct' htmlFor="nomeDoProduto">Seu nome</label>
                    <input className='input__addproduct' type="text" ref={nomeRef} />
                    <span className='barra__addproduct'></span>
                </div>

                <div className="container__addproduct">
                    <label className='label__addproduct' htmlFor="">Nome da loja</label>
                    <input className='input__addproduct' type="text"  ref={NomeDaLojaRef}/>
                    <span className='barra__addproduct'></span>
                </div>

                <div className="container__addproduct">
                    <label className='label__addproduct' htmlFor="">E-mail</label>
                    <input className='input__addproduct' type="text"  ref={emailRef}/>
                    <span className='barra__addproduct'></span>
                </div>

                <div className="container__addproduct">
                    <label className='label__addproduct' htmlFor="">Nova senha</label>
                    <div className='input__img'>
                        <input className='input__edit--Profile' type={mostrarSenha ? "text" : "password"}  ref={senhaRef}/>
                        <img className='img__senha' src={imagemAtual} alt="imagem de ocutar a senha" onClick={trocarImagem} />
                    </div>
                    <span className='barra__addproduct'></span>
                </div>

                <div className="container__addproduct">
                    <label className='label__addproduct' htmlFor="">Repita a nova senha</label>
                    <div className='input__img'>
                        <input className='input__edit--Profile' type={mostrarSenha ? "text" : "password"} ref={senhaIdenticaRef}/>
                        <img className='img__senha' src={imagemAtual} alt="imagem de ocutar a senha" onClick={trocarImagem} />
                    </div>
                    <span className='barra__addproduct'></span>
                </div>
            <button onClick={handleButtonClick} className='product__button--cancelar'>Cancelar</button>
            </form>
            <span className='barra__full--addproduct'></span>
        <button onClick={handleSubmit} className='product__button--addproduct'>Editar perfil</button>
        </>
    )
}