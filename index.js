const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const path = require('path')

const mongo = process.env.MONGODB || 'mongodb://localhost/minhas-series' 
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const pages = require('./routes/pages')
const series = require('./routes/series')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', pages)
app.use('/series', series)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))



mongoose
    .connect(mongo, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        app.listen(port, ()=> console.log('listening on: '+port))
    })
    .catch(e => console.log(e))

