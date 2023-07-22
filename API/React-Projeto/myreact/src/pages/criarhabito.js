import React, { useState  } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
export default function CriaHab(){
  
    const navigate = useNavigate();
  
    const [inputs, setInputs] = useState([]);
  
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
  
        axios.post('http://127.0.0.1:5000/addhabito', inputs).then(function(response){
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
                <h1>Criar um hábito</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label>Hábito</label>
                      <input type="text" className="form-control" name="habito" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label>Hora</label>
                      <input type="text" className="form-control" name="hora" onChange={handleChange} />
                    </div>   
                    <button type="submit" name="add" className="btn btn-primary">Salvar</button>
                </form>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    </div>
  );
}