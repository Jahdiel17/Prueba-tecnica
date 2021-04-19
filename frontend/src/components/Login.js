import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import {login} from '../features/userSlice';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

const Login = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if( name.length < 3 ) {
      Swal.fire('El nombre debe de tener al menos 3 caracteres')
    } else if ( email === '' ) {
      Swal.fire('Todos los campos son obligatorios')
    } else if ( password.length < 5 ) {
      Swal.fire('La contraseña debe de tener al menos 5 caracteres')
    } else {

      dispatch(
        login({
          name: name,
          email: email,
          password: password,
          loggedIn: true,
        })
      );
  
      history.push("/productos");
    }

  }

  return (
    <div className="containerPrincipal">
        <div className="containerSecundario">
          <form className="form-group" onSubmit={(e)=> handleSubmit(e)}>
            <label>Nombre: </label>
            <br />
            <input
              type="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}

            />
            <br />
            <label>Email: </label>
            <br />
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}

            />
            <br />
            <label>Contraseña: </label>
            <br />
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
              <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
          </form>
        </div>
      </div>
  )
}

export default Login
