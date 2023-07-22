import React, { useState, useEffect  } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
 
export default function EditarHab(){
  
    const navigate = useNavigate();
  
    const [inputs, setInputs] = useState([]);
  
    const {id} = useParams();
  
    useEffect(() => {
        getUser();
    }, []);
  
    function getUser() {
        axios.get(`http://127.0.0.1:5000/detalheshabitos/${id}`).then(function(response) {
            console.log(response.data);
            setInputs(response.data);
        });
    }
  
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
  
        axios.put(`http://127.0.0.1:5000/atualizarhabito/${id}`, inputs).then(function(response){
            console.log(response.data);
            navigate('/');
        });
          
    }
     
    return (
    <div>
        <div className="container h-100">
        <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
            <h1>Editar hábito</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Hábito</label>
                  <input type="text" value={inputs.habito} className="form-control" name="habito" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label>Hora</label>
                  <input type="text" value={inputs.hora} className="form-control" name="hora" onChange={handleChange} />
                </div>   
                <button type="submit" name="update" className="btn btn-primary">Salvar</button>
            </form>
            </div>
            <div className="col-2"></div>
        </div>
        </div>
    </div>
  );
}