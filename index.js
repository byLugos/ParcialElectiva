const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname,'public')))

app.set('PORT',process.env.PORT || 3000 )

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(express.json())
app.use('/',require('./routes/index'))
app.use(express.urlencoded({extended:true}))

app.listen(app.get('PORT'),()=>console.log(`Server ready at Port ${app.get('PORT')}`))