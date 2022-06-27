import express from "express"
import fetch from "node-fetch"
import bodyParser from "body-parser"

const app = express()
app.use(bodyParser.urlencoded({extended:true}))


// __DIRNAME CODE  ------
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
// app.use("/", express.static(__dirname))
// ----------------------



app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html")
})


app.post("/", (req,res) => {
    const city = req.body.city
    const apiKey = "b1970f8b5bfac16ba049630faed3055e"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    
    // FETCH METHOD (like in frontend)
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tempCelsius = (data.main.temp-272.15).toFixed(2)
            const weatherDescription = data.weather[0].description
            const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            res.write(`<p>The weather is currently: ${weatherDescription}</p>`)
            res.write(`<h1>The temperature in in ${city} is: ${tempCelsius} degrees</h1>`)
            res.write(`<img src=${weatherIcon}>`)
            res.send()
        })

    })


app.get("/contact", (req,res) => {    
        res.sendFile(__dirname + "/contact.html")
    })

app.listen(3000)