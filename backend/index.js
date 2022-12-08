import express from "Express";
import mysql from "mysql";
import cors from "cors";


const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "entry_task",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("backend");
});

app.get("/cpulist", (req, res) => {
    // const q= "SELECT * FROM entry_task.cpulist;";
    const q= "SELECT id, brand, model, socketid FROM entry_task.cpulist;";
    db.query(q,(err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.get("/socketlist", (req, res) => {
    const q = "SELECT * FROM entry_task.socketlist;";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
})

app.get("/cpulist/:id", (req, res) => {
  const id = req.params.id
  const q = "SELECT * FROM entry_task.cpulist WHERE id = ?;";
  db.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
})

app.post("/cpulist", (req, res) => {
    const q = "INSERT INTO cpulist (`brand`, `model`, `socketid`, `clockspeed`, `cores`, `threads`, `tdp`, `price`) VALUES (?);";
  
    const values = [
      req.body.brand,
      req.body.model,
      req.body.socketid,
      req.body.clockspeed,
      req.body.cores,
      req.body.threads,
      req.body.tdp,
      req.body.price,
    ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

app.delete("/cpulist/:id", (req, res) => {
    const cpuID = req.params.id
    const q = "DELETE FROM cpulist WHERE id = ?";
    db.query(q, [cpuID], (err, data) => {
      if (err) return res.json(err);
      return res.json("Deleted!");
    });
})

app.put("/cpulist/:id", (req, res) => {
    const cpuID = req.params.id;
    const q = "UPDATE cpulist SET `brand`= ?, `model`= ?, `socketid`= ?, `clockspeed`= ?, `cores`= ?, `threads`= ?, `tdp`= ?, `price`= ? WHERE id = ?";
  
    const values = [
      req.body.brand,
      req.body.model,
      req.body.socketid,
      req.body.clockspeed,
      req.body.cores,
      req.body.threads,
      req.body.tdp,
      req.body.price,
    ];
  
    db.query(q, [...values,cpuID], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

app.listen(8800, () => {
    console.log("connected");
});