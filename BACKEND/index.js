const express = require("express");
const {mobil} = require('./models');
const app = express();
const PORT = 5000;
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.json())

app.get('/mobil', (req,res)=>{
    mobil.findAll().then(mobils => {
        res.status(200).json({data:mobils})
    }).catch(err =>{
        res.status(500).json(err)
    })
})

app.get('/mobil/:id', (req,res)=>{
    const id = req.params.id;
    mobil.findByPk(id).then(mobils => {
        res.status(200).json({data:mobils})
    }).catch(err =>{
        res.status(500).json(err)
    })
})

app.put('/mobil/:id', (req,res)=>{
    const id = req.params.id;
    const body = req.body
    mobil.update(body,{where:{'id':id}}).then(mobils => {
        res.status(200).json({data:mobils})
    }).catch(err =>{
        res.status(500).json(err)
    })
})

app.delete('/mobil/:id', (req,res)=>{
    const id = req.params.id;
    mobil.destroy({where:{'id':id}}).then(mobils => {
        res.status(200).json({data:mobils})
    }).catch(err =>{
        res.status(500).json(err)
    })
})

app.post('/mobil', (req,res)=>{
    const body = req.body
    mobil.create(body).then(mobils => {
        res.status(200).json({data:mobils})
    }).catch(err =>{
        res.status(500).json(err)
    })
})

app.delete('/delete/:id', (req,res)=>{ 
    const id = req.params.id; 
    mobil.destroy({where:{'id':id}}).then(car => { 
        res.status(200).json({data:car}) 
    }).catch(err =>{ 
        res.status(500).json(err) 
    }) 
})

app.put('/mobil/:id', (req,res)=>{ 
    const id = req.params.id; 
    const body = req.body 
    mobil.update(body,{where:{'id':id}}).then(car => { 
        res.status(200).json({data:car}) 
    }).catch(err =>{ 
        res.status(500).json(err) 
    }) 
})

app.get('/filter/:filter', (req, res) => { 
    const id = req.params.filter; 
    console.log(id) 
    mobil.findAll({ 
  where: { 
    ukuran: id 
  } 
}).then(car => { 
        res.status(200).json({ data: car }) 
    }).catch(err => { 
        res.status(500).json(err) 
    }); 
})

app.listen(PORT, () => {
  console.log("HERE WE GO http://localhost:%d", PORT);
});






