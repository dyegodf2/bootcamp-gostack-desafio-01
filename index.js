const express = require('express')

const server = express()

server.use(express.json())

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

server.get('/projects', (req, res) => {
  return res.json(projects)
})

server.post('/projects', (req, res) => {
  const { id, title, tasks } = req.body
  const project = { id, title, tasks }

  projects.push(project)

  return res.json(projects)
})

server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params
  const { tasks } = req.body

  projects[id].tasks.push(tasks)

  console.log(id, tasks)
  return res.json({ message: 'Ok' })
})

server.put('/projects/:id', (req, res) => {
  const { id } = req.params
  const { title } = req.body

  projects[id].title = title

  return res.json(projects)
})

server.delete('/projects/:id', (req, res) => {
  const { id } = req.params

  projects.splice(id, 1)

  return res.json(projects)
})

server.listen(3000)
