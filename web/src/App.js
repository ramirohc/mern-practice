import { useState } from "react";
import axios from "axios";

function App(){ 

const [datos, setDatos] = useState({
  usuario: "",
  clave: ""
});

const handleInputChange = (e) =>{
  let {name, value} = e.target;
  let newDatos = {...datos, [name]: value};
  setDatos(newDatos);
}

const handleSubmit = async(e)=>{
  e.preventDefault();
  if(!e.target.checkValidity()){
    console.log("no enviar");
  }else{
    let res = await axios.post("http://localhost:3001/usuario/login",datos);
    console.log(res.datos);

  }
};

  return (    
   <section className="h-100">
    <div className="container h-100">
          <div className="row justify-content-sm-center h-100">
            <div className="col-xxl-4 col-cl-5 col-lg-5 col-md-7 col-sm-9">
                <div className="card shadow-lg">
                  <div className="card-body p-5">
                      <h1 className="fs-4 card-title fw-bold mb-4">Iniciar Secion</h1>
                        <form onSubmit={handleSubmit} className="needs-validation" noValidate="{true}" autocomplete="off">
                              <div className="mb-3">
                                <label className="mb-2 text-muted" htmlForm="email">Usuario</label>
                                <input id="email" type="text" onChange={handleInputChange} value={datos.usuario} className="form-control" name="usuario" required autoFocus/>
                                  <div className="invalid-feedback">
                                          Usuario invalido
                                  </div>
                            </div>
                            <div className="mb-3">
                                  <div className="mb-2 w-100">
                                      <label className="text-muted" htmlForm="password">Contraseña</label>
                                      <a href="/" className="float-end">
                                        Olvidastes tu Contraseña?
                                      </a>
                                  </div>
                                  <input id="password" type="password" onChange={handleInputChange} value={datos.clave} className="form-control" name="clave" required/>
                                  <div className="invalid-feedback">
                                    Contraseña es Requerida
                                  </div>
                            </div>
                            <div className="d-flex align-items-center">
                                  <div className="form-check">
                                    <input type="checkbox" name="remember" id="remember" className="form-checkinput"/>
                                    <label htmlForm="remember" className="form-check-label">Recordarme</label>
                                  </div>
                                  <button type="submit" className="btn btn-primary ms-auto">
                                      <i className="bi bi-box-arrow-in-right"></i>Ingresar
                                  </button>
                            </div>
                        </form>
                  </div>
                  <div className="card-footer py-3 border-0">
                    <div className="text-center">
                      Servicios Publicos Municipales SMP
                    </div>
                  </div>
                </div>
            </div>
          </div>
    </div>
   </section>
  );
}

export default App;
