const express = require('express')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
  return res.json({ message: 'Olá mundo!' })
})

server.listen(3000)
