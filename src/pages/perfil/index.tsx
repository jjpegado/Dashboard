import './styles.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useEffect } from 'react';
import { NavBar } from '../../components/Navbar';
import { apiAuth } from '../../services/api';


export function Perfil() {
    const navigate = useNavigate()
    const usuario = localStorage.getItem('user')
    const user = JSON.parse(usuario);
    const token =  localStorage.getItem('token')
    

    useEffect(() =>{
        if(!token){
            navigate('/')
        }
    })
    
    const nomeRef = user.nome
    const nomeDaLojaRef = user.nome_loja
    const emailRef = user.email
        
    async function updateProduct(element: FormEvent) {
        element.preventDefault()

        try {
            await apiAuth.get('/perfil',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            return navigate('/perfil/editar')
    
        } catch (error: any) {
            toast(error.response.data, {type: 'info'})
        }
    }

    return(
        <>
        <NavBar />
            <h3 className='title__products'>{user.nome_loja}</h3>
            <h5 className='sube__title--products'>Perfil</h5>
            <form className="form__editProduct">
                <div className="container__addproduct">
                    <label className='label__addproduct' htmlFor="nomeDoProduto">Seu nome</label>
                    <input className='input__addproduct' type="text" value={nomeRef}  readOnly/>
                    <span className='barra__addproduct'></span>
                </div>

                <div className="container__addproduct">
                    <label className='label__addproduct' htmlFor="">Nome da loja</label>
                    <input className='input__addproduct' type="text"  value={nomeDaLojaRef} readOnly/>
                    <span className='barra__addproduct'></span>
                </div>

                <div className="container__addproduct">
                    <label className='label__addproduct' htmlFor="">E-mail</label>
                    <input className='input__addproduct' type=""  value={emailRef} readOnly />
                    <span className='barra__addproduct'></span>
                </div>
            </form>
            <span className='barra__full--addproduct'></span>
        <button onClick={updateProduct} className='profile__button'>Editar perfil</button>       
        </>
    )
}