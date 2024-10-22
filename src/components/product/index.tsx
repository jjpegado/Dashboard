import './styles.css'
import Lixo from '../../assets/lixo.svg';
import { IPoducts, ProductsProps } from '../../interfaces/products.interfaces';
import { apiAuth } from '../../services/api';
import { useNavigate } from 'react-router-dom';


export function Product({item, deletado, setDeletado}: Readonly<ProductsProps>) {
    const {nome, estoque, preco, descricao, imagem} = item
    const token =  localStorage.getItem('token')
    const navigate = useNavigate()

    async function deletarProduct(item: IPoducts){
        await apiAuth.delete(`/produtos/${item.id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        setDeletado(!deletado)
    }

    function handleButtonDetail(){
        navigate(`/produtos/${item.id}/editar`);
    }

    return(
        <div className='product'>
            <div className='container__img__product--exluir'>
            <img onClick={() => deletarProduct(item)} className='img__product--exluir' src={Lixo} alt="" />
            </div>
            <img onClick={handleButtonDetail} className='img__product' src={imagem}  alt="" />

            <div className='product__description' onClick={handleButtonDetail}>
                <h3 className='product__description--title'>{nome}</h3>
                <p className='product__description--description'>
                    {descricao}</p>

                <div className='product__description--values'>
                    <h4 className='product__description--uni'>{estoque} unidades</h4>
                    <h4 className='product__description--value'>RS {preco}</h4>
                </div>
            </div>
        </div>
    )
}