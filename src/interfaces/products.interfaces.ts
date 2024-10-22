export interface IPoducts {
    id: number
    descricao: string
    estoque:number
    imagem:string
    nome: string
    preco: number
}

export interface ProductsProps {
    item: IPoducts;
    deletado: boolean
    setDeletado: (term: boolean) => void
}