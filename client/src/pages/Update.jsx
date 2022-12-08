import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';


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
  
  function Sockets(socket) {
    return <option value = {socket.id}>{socket.socket}</option>
  }

  console.log(cpuItem);
  // console.log(sockets);

  // function test1(cpuItemInput){
  //   // console.log("<><><><><><><><><><>");
  //   // console.log(cpuItemInput);
  //   // console.log("<><><><><><><><><><>");
  //   return cpuItemInput?.brand
  // }

  
    // const [age, setAge] = React.useState('');
  
    // const handleChangeDrop = (e) => {
    //   setAge(e.target.value);
    // };
  
    //   // <Box sx={{ minWidth: 120 }}>
    //     <FormControl fullWidth>
    //       <InputLabel id="demo-simple-select-label">Age</InputLabel>
    //       <Select
    //         labelId="demo-simple-select-label"
    //         id="demo-simple-select"
    //         value={age}
    //         label="Age"
    //         onChange={handleChange}
    //       >
    //         <MenuItem value={10}>Ten</MenuItem>
    //         <MenuItem value={20}>Twenty</MenuItem>
    //         <MenuItem value={30}>Thirty</MenuItem>
    //       </Select>
    //     </FormControl>
    //   // </Box>
  
  return (
    <div className="form">
      <h1>View/Update CPU specifications</h1>
      {/* <p> Brand: <input type="text" defaultValue={cpuItem[0]?.brand} name="brand" onChange={handleChange} /></p> */}
      <p> Brand: <input type="text" defaultValue={cpuItem?.brand} name="brand" onChange={(e)=>handleChange(e)} /></p>
      <p> Model: <input type="text" defaultValue={cpuItem?.model} name="model" onChange={(e)=>handleChange(e)} /></p>

      <p> Socket: <select type="number" name = "socketid" onChange={handleChange}>
        <option value = {socketID}>{sockets[socketID-1]?.socket}</option>
        {sockets.map((element)=>Sockets(element))}
      </select></p>
      
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