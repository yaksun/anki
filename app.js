
const express = require('express')
const path = require('path')
const app = express()
 
app.use(express.static(path.join(__dirname, 'dist')))
app.listen(1888,() => {
    console.log('app listening on port 1888.')
})

