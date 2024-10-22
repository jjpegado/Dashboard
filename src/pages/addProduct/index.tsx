import './styles.css'
import { NavBar } from "../../components/Navbar";
import { useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { apiAuth } from '../../services/api';


export function AddProduct() {
    const navigate = useNavigate()
    
    const usuario = localStorage.getItem('user')
    const user = JSON.parse(usuario)
    const token =  localStorage.getItem('token')

    useEffect(() =>{
        if(!token){
            navigate('/')
        }
    })

    const nomeDoProductRef = useRef<HTMLInputElement>(null)
    const precoRef = useRef<HTMLInputElement>(null)
    const estoqueRef = useRef<HTMLInputElement>(null)
    const descricaoRef = useRef<HTMLInputElement>(null)
    const imagemRef = useRef<HTMLInputElement>(null)
    
    async function handleSubmit(element: FormEvent) {
        element.preventDefault()
    
        if(!nomeDoProductRef.current?.value || !precoRef.current?.value
            || !estoqueRef.current?.value || !descricaoRef.current?.value || !imagemRef.current?.value){
            toast('Os campos são obrigatórios..', {type: 'info'})
            return 
        }
        try {
            apiAuth.post('/produtos', {
                nome: nomeDoProductRef.current?.value,
                preco: precoRef.current?.value,
                estoque: estoqueRef.current?.value,
                descricao: descricaoRef.current?.value,
                imagem: imagemRef.current?.value
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            
            return navigate('/produtos')
    
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
            <h5 className='sube__title--products'>Adicionar produto</h5>
            <form className="form__addproduct">
                <div className="container__addproduct">
                    <label className='label__addproduct' htmlFor="nomeDoProduto">Nome do produto</label>
                    <input className='input__addproduct' type="text" ref={nomeDoProductRef} />
                    <span className='barra__addproduct'></span>
                </div>

                <div className='container__addproduct--number'>
                    <div className="addproduct--number">
                            <label className='label__addproduct--number' htmlFor="">Preço</label>
                        <div className='container__input__addproduct--number'>
                            <p className='p__addproduct--number'>R$</p>
                            <input className='input__addproduct--number' type="number"  ref={precoRef}/>
                            
                        </div>
                        <span className='barra__addproduct--number' ></span>
                    </div>
                    <div className="addproduct--number">
                        <label className='label__addproduct--number' htmlFor="">Estoque</label>
                        <div className='container__input__addproduct--number'>
                            <p className='p__addproduct--number'>Un</p>
                            <input className='input__addproduct--number' type="number" ref={estoqueRef} />
                        </div>
                        <span className='barra__addproduct--number' ></span>
                    </div>
                </div>

                <div className="container__addproduct">
                    <label className='label__addproduct' htmlFor="">Descrição do produto</label>
                    <input className='input__addproduct' type="text"  ref={descricaoRef}/>
                    <span className='barra__addproduct'></span>
                </div>

                <div className="container__addproduct">
                    <label className='label__addproduct' htmlFor="">imagem</label>
                    <input className='input__addproduct' type="text"  ref={imagemRef}/>
                    <span className='barra__addproduct'></span>
                </div>
            <button onClick={handleButtonClick} className='product__button--cancelar'>Cancelar</button>
            </form>
            <span className='barra__full--addproduct'></span>
        <button onClick={handleSubmit} className='product__button--addproduct'>Adicionar produto</button>
        </>
    )
}