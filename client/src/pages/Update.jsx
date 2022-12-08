import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
 
  const location = useLocation();
  const navigate = useNavigate();
  const cpuItemID = location.pathname.split("/")[2];
  
  const [cpuItem, setCpuItem] = useState([]);
  const [socketID, setSocketID]=useState("");
  useEffect(()=>{
      const fetchCpuItem = async()=>{
         try{
              const res = await axios.get(`http://localhost:8800/cpulist/${cpuItemID}`);
              setCpuItem(res.data[0]);
              setSocketID(res.data[0].socketid);
         } catch(err) {
              console.log(err);
         };
      };
      fetchCpuItem();
  },[cpuItemID]);
  
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

  // function renameSocket (currentSocketId) {
  //     for (let j in sockets) {
  //         if (currentSocketId===sockets[j].id) return sockets[j].cpusocket
  //     };
  // };

  // const socketsWorking = sockets.map((element) =>{
  //   return String(element.socket);
  // });

  // let cpuItemWorking = cpuItem['0'];

  // console.log(socketsWorking[4]);
  // console.log(cpuItemWorking);
  // console.log(typeof(cpuItemWorking));
 
  // console.log(oneCPUItem);
  // console.log(socketItemID);
  // console.log(socketItem);

  const [error,setError] = useState(false);
  const handleChange = (e) => {
    setCpuItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const handleClick = async (e) => {
    // e.preventDefault();
    try {
      console.log(cpuItem);
      await axios.put(`http://localhost:8800/cpulist/${cpuItemID}`, cpuItem);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  
  console.log(cpuItem);
  // function inputDefaultBrand(){
  //   const defaultValue = String(cpuItem[0].brand)
  //   return defaultValue
  // }

  function test1(cpuItemInput){
    // console.log("<><><><><><><><><><>");
    // console.log(cpuItemInput);
    // console.log("<><><><><><><><><><>");
    return cpuItemInput?.brand
  }

  return (
    <div className="form">
      <h1>View/Update CPU specifications</h1>
      {/* <p> Brand: <input type="text" defaultValue={cpuItem[0]?.brand} name="brand" onChange={handleChange} /></p> */}
      <p> Brand: <input type="text" defaultValue={test1(cpuItem)} name="brand" onChange={(e)=>handleChange(e)} /></p>
      <p> Model: <input type="text" defaultValue={cpuItem?.model} name="model" onChange={(e)=>handleChange(e)} /></p>
      <p> Socket: <input type="text" defaultValue="3" name="socketid" onChange={handleChange} /></p>  
      <p> Clockspeed [GHz]: <input type="text" defaultValue={cpuItem?.clockspeed} name="clockspeed" onChange={handleChange} /></p>
      <p> Cores: <input type="number" defaultValue={cpuItem?.cores} name="cores" onChange={handleChange} /></p>
      <p> Threads: <input type="number" defaultValue={cpuItem?.threads} name="threads" onChange={handleChange} /></p>     
      <p> TDP [W]: <input type="number" defaultValue={cpuItem?.tdp} name="tdp" onChange={handleChange} /></p>     
      <p> Price [Euro]: <input type="number" defaultValue={cpuItem?.price} name="price" onChange={handleChange} /></p>    
      
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">List of CPUs</Link>
    </div>
  );
};

export default Update;