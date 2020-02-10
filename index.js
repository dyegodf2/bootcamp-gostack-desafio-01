const express = require('express')

const server = express()

let request = 0
const projects = [
  {
    id: '0',
    title: 'Projeto 0',
    tasks: []
  },
  {
    id: '1',
    title: 'Projeto 1',
    tasks: []
  },
  {
    id: '3',
    title: 'Projeto 3',
    tasks: []
  }
]

// Middlewares
server.use(countRequest, express.json())

function countRequest (req, res, next) {
  console.time('Request')

  request++
  console.log(`Total de requisições: ${request}`)
  next()

  console.timeEnd('Request')
}

function checkProjectExists (req, res, next) {
  const { id } = req.params
  if (!projects[id]) return res.status(400).json({ message: 'Project does not exist' })

  next()
}

// Routes
// Listando projeto
server.get('/projects', (req, res) => {
  return res.json(projects)
})

// Adicionando projeto
server.post('/projects', (req, res) => {
  const { id, title, tasks } = req.body
  const project = { id, title, tasks }

  projects.push(project)
  return res.json(projects)
})

// Adicionanto trabalho
server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params
  const { tasks } = req.body

  projects[id].tasks.push(tasks)
  return res.json({ message: 'Ok' })
})

// Editando projeto
server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params
  const { title } = req.body

  projects[id].title = title
  return res.json(projects)
})

// Deletando projeto
server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params

  projects.splice(id, 1)
  return res.json(projects)
})

server.listen(3000)
