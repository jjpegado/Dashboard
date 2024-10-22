import './styles.css'
import { NavBar } from '../../components/Navbar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../components/product';
import { IPoducts } from '../../interfaces/products.interfaces';
import { apiAuth } from '../../services/api';


export default function Produtos() {
    const navigate = useNavigate()
    const token =  localStorage.getItem('token')
    const usuario = localStorage.getItem('user')
    const user = JSON.parse(usuario);
    const [products, setProducts] = useState<IPoducts[]>([])
    const [deletado, setDeletado] = useState<boolean>(false)
    
    useEffect(() =>{

        if(!token){
            navigate('/')
        }
    })

    async function getProducts() {

        try {
            const {data} = await apiAuth.get('/produtos', {
                headers:{
                    Authorization:`Bearer ${token}`
                },
            })
            setProducts(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getProducts()
    },[deletado])


function handleButtonClick(){
    navigate('/produtos/novo');
}
return (
    <>
    <NavBar />
        <h3 className='title__products'> {user.nome_loja}</h3>
        <h5 className='sube__title--products'>Seus produtos</h5>
    <div className='container-products'>

        {products.map(item => 
        <Product key={item.id} item={item} deletado={deletado} setDeletado={setDeletado}/>)}

    </div>
    <span className='barra__products'></span>
    <button onClick={handleButtonClick} className='product__button--add'>Adicionar produto</button>
    </>
);
}
