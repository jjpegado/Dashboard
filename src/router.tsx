import { Route, Routes } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Produtos from "./pages/Produtos";
import { AddProduct } from "./pages/addProduct";
import { EditProduct } from "./pages/editProduct";
import { Perfil } from "./pages/perfil";
import { EditProfile } from "./pages/editProfile";

export default function Router() {
    return(
        <Routes>
            <Route path="/usuarios" element={<Register/>}/>
            <Route path="/" element={<Login />}/>
            <Route path="/produtos" element={<Produtos/>}/>
            <Route path="/produtos/novo" element={<AddProduct/>}/>
            <Route path="/produtos/:id/editar" element={<EditProduct/>}/>
            <Route path="/perfil" element={<Perfil/>}/>
            <Route path="/perfil/editar" element={<EditProfile/>}/>
        </Routes>
    )
}