import './styles.css';
import imagemProduct from '../../assets/Rectangle 4.png'
import { toast } from 'react-toastify';
import { apiAuth } from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { FormEvent, useEffect, useRef } from 'react';
import { NavBar } from '../../components/Navbar';


export function EditProduct() {
    const navigate = useNavigate()
    const { id } = useParams();
    const usuario = localStorage.getItem('user')
    const user = JSON.parse(usuario);
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
    // const donoDoProdutoRef = useRef<HTMLInputElement>(null)
    const imagemRef = useRef<HTMLInputElement>(null)
        
    async function updateProduct(element: FormEvent) {
        element.preventDefault()

        try {
            await apiAuth.put(`/produtos/${id}`, {
                nome: nomeDoProductRef.current?.value,
                preco: precoRef.current?.value,
                estoque: estoqueRef.current?.value,
                descricao: descricaoRef.current?.value,
                // dono: donoDoProdutoRef.current?.value
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
            <form className="form__editProduct">
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

                {/* <div className="container__addproduct">
                    <label className='label__addproduct' htmlFor="">Dono do produto</label>
                    <input className='input__addproduct' type="text"  ref={donoDoProdutoRef}/>
                    <span className='barra__addproduct'></span>
                </div> */}

                <div className="container__addproduct">
                    <label className='label__addproduct' htmlFor="">imagem</label>
                    <input className='input__addproduct' type="text"  ref={imagemRef}/>
                    <span className='barra__addproduct'></span>
                </div>
            <button onClick={handleButtonClick} className='product__button--cancelar'>Cancelar</button>
            </form>
            <span className='barra__full--addproduct'></span>
        <button onClick={updateProduct} className='product__button--addproduct'>Salvar alterações</button>
        <img className='img__editProduct' src={imagemProduct} alt="" />
        </>
    )
}