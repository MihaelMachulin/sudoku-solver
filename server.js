// Это бэкэнд, детка!
// npm i axios express cors dotenv
const PORT = process.env.PORT || 800
const axios = require('axios').default
const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname)))

app.post('/solve', (req, res) => {
    const options = {
        method: 'POST',
        url: 'https://sudoku-solver2.p.rapidapi.com/',
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-host': 'sudoku-solver2.p.rapidapi.com',
          'x-rapidapi-key': process.env.RAPID_API_KEY
        },
        data: {
          input: req.body.numbers
        }
      }
    
      axios.request(options).then( (response) => {
        console.log(response.data)
        res.json(response.data)
      }).catch((error) => {
        console.error('Error:', error)
      })
})

app.listen(PORT, () => console.log(`server listening on PORT ${PORT}`))