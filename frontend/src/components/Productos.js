import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

const Productos = ({productos}) => {

    let history = useHistory();

    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.preventDefault();

        dispatch(logout());

        history.push("/");
    }

    if(productos.length === 0) return null;

        return ( 
            <Fragment>
                    <button className="btn btn-danger mx-3 px-4 my-3 text-uppercase font-weight-bold" onClick={(e) => handleLogout(e)} >Cerrar Sesion</button>

                <h1>Administrador de Productos</h1>

                <div className="container mt-5 py-5">
                    <div className="row">
                        <div className="col-12 mb-5 d-flex justify-content-center" >
                            <Link to={'/nuevo'} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold">Agregar Producto</Link>
                        </div>

                        <div className="col-md-8 mx-auto" >
                            <div className="list-group" >
                                {productos.map(producto => (
                                    <Link to={`/producto/${producto._id}`} key={producto._id} className="p-5 list-group-item list-group-item-action flex-column align-items-start" >
                                        <div className="d-flex w-100 justify-content-between mb-4" >
                                            <h3 className="mb-3" >{producto.nombre}</h3>
                                            <small className="precio" >
                                                L.{producto.precio}
                                            </small>
                                        </div>

                                        <p className="mb-0" >
                                            {producto.descripcion}
                                        </p>
                                        <div className="cantidad py-3" >
                                            <p>Cantidad: {producto.cantidad}</p>
                                        </div>

                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
                
            </Fragment>
        );

}
export default Productos;