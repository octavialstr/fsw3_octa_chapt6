const express = require("express");

const axios = require('axios');
const uploadOnMemory = require("./uploadOnMemory");
const cloudinary = require("./cloudinary");
const app = express();
app.use(express.static("public"));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 2000;

app.get('/', async (req, res) => {
    try {
        const mobil = await axios.get('http://localhost:5000/mobil');
        console.log('mobil',mobil)
        res.render('index', mobil.data)
    } catch (err) {
         console.log('err', err)
        res.status(500).json(err)
       
    }
})

  app.get("/add", (req, res) => { 
    res.render("add"); 
  }); 
   
  app.post("/add", uploadOnMemory.single("gambar"), (req, res) => { 
    const fileBase64 = req.file.buffer.toString("base64"); 
    const file = `data:${req.file.mimetype};base64,${fileBase64}`; 
   
    cloudinary.uploader.upload(file,{folder:'img'}, async function (err, result) { 
      if (!!err) { 
        console.log(err); 
        return res.status(400).json({ 
          message: "Gagal upload file!", 
        }); 
      } 
   
      const body = req.body; 
      body.gambar = result.url; 
      console.log(body)
      try { 
        const cars = await axios.post("http://localhost:5000/mobil", body); 
        console.log(cars)
        return res.redirect("/")
      } catch (err) { 
        return res.status(500).json(err); 
      } 
    }); 
  });

  app.get('/delete/:id', async (req, res) => { 
    try { 
        const id = req.params.id; 
        const cars = await axios.delete(`http://localhost:5000/delete/${id}`); 
        res.redirect("/") 
    } catch (err) { 
        res.status(500).json(err) 
    } 
})

app.get('/edit/:id', async (req, res) => { 
    try { 
        const id = req.params.id; 
        const cars = await axios.get(`http://localhost:5000/mobil/${id}`); 
        res.render('edit', cars.data) 
    } catch (err) { 
        res.status(500).json(err) 
    } 
})

app.post(
    "/edit/:id", 
    uploadOnMemory.single("gambar"), 
    (req, res) => { 
        const fileBase64 = req.file.buffer.toString("base64"); 
        const file = `data:${req.file.mimetype};base64,${fileBase64}`; 
 
        cloudinary.uploader.upload(file, { folder: 'test' }, async function (err, result) { 
            if (!!err) { 
                console.log(err); 
                return res.status(400).json({ 
                    message: "Gagal upload file!", 
                }); 
            } 
 
            const id = req.params.id; 
            const body = req.body; 
            body.gambar = result.url; 
            try { 
                const cars = await axios.put(`http://localhost:5000/mobil/${id}`, body); 
                return res.redirect("/") 
            } catch (err) { 
                return res.status(500).json(err) 
            } 
        }); 
    } 
);

app.get('/filter', async (req, res) => { 
    try { 
        const id = req.query.filter; 
        console.log(id) 
        const cars = await axios.get(`http://localhost:5000/filter/${id}`); 
        res.render('index', cars.data) 
    } catch (err) { 
        res.status(500).json(err) 
    } 
})

app.listen(PORT, () => {
    console.log(`HERE WE GO http://localhost:${PORT}`);
});
