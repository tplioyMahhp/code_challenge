import React, { useEffect, useState } from "react";
import axios from "axios"
import {Link} from 'react-router-dom';
  
export default function ListHab(){

    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('http://127.0.0.1:5000/listhabitos').then(function(response) {
            console.log(response.data);
            setUsers(response.data);
        });
    }
    
    const deleteUser = (id) => {
        axios.delete(`http://127.0.0.1:5000/deletarhabito/${id}`).then(function(response){
            console.log(response.data);
            getUsers();
        });
        alert("Successfully Deleted");
    }

    return (
    <div>
        <div className="container h-100">
            <div className="row h-100">
                <div className="col-12">
                    <p><Link to="/addnovohabito" className="btn btn-success">Adicionar um novo hábito</Link> </p>
                    <h1>Costumes já adicionados</h1>
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Hábitos</th>
                                <th>Hora</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, key) =>
                                <tr key={key}>
                                    <td>{user.id}</td>
                                    <td>{user.habito}</td>
                                    <td>{user.hora}</td>
                                    <td>
                                        <Link to={`habito/${user.id}/editar`} className="btn btn-success" style={{marginRight: "10px"}}>Editar</Link>
                                        <button onClick={() => deleteUser(user.id)} className="btn btn-danger">Deletar</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  );
}