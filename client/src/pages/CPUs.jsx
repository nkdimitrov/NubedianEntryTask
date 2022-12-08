import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";


const CPUs = () => {
    
    const [CPUs, setCPUs] = useState([]);
    useEffect(()=>{
        const fetchAllCPUs = async()=>{
           try{
                const res = await axios.get("http://localhost:8800/cpulist");
                setCPUs(res.data);
           } catch(err) {
                console.log(err);
           };
        };
        fetchAllCPUs();
    },[]);

    const [sockets, setSocket] = useState([]);
    useEffect(()=>{
        const fetchAllSockets = async()=>{
            try{
                const res = await axios.get("http://localhost:8800/socketlist");
                setSocket(res.data);
            } catch(err) {
                console.log(err);
             };
        };
        fetchAllSockets();
    },[]);

    function renameSocket (currentSocketId) {
        for (let j in sockets) {
            if (currentSocketId===sockets[j].id) return sockets[j].socket
        };

    };
    
    const handleDelete = async (id) => {
        try {
          await axios.delete("http://localhost:8800/cpulist/"+id);
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
    };

    return <div>
        <h1>List of CPUs</h1>
        <div className="CPUs">
            {CPUs.map((cpu)=>(
                <div className="cpuItem" key={cpu.id}>
                    <p>{cpu.brand} || {cpu.model} || {renameSocket(cpu.socketid)} 
                    <button className="delete" onClick={() => handleDelete(cpu.id)}>Delete</button>
                    <button className="update"><Link to={`/update/${cpu.id}`}>View/Update</Link></button>
                    </p>

                </div>
            ))}
        </div>
        <button>
            <Link to= "/add">Add new entry</Link>
        </button>
    </div>;
    
};

export default CPUs;