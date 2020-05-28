require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

// custom token for post body:
morgan.token('body', (req) => { return JSON.stringify( req.body) })

const logFormat = (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '- body:',
    tokens.body(req,res), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}


app.use(express.json())
app.use(cors())
app.use(morgan(logFormat))
app.use(express.static('build'))
app.use(express.json())

// const requestLogger = (request, respo\nse, next) => {
//   console.log('Method:', request.method)
//   console.log('Path: ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }

// app.use(requestLogger)

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(persons => {
      res.json(persons.map(person => person.toJSON()))
    })
})


app.get('/api/persons/:id', (req, res, next) => {
  Person
    .findById(req.params.id)
    .then(person => {
      if(person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  // console.log(body)

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'content (number or name) missing'
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON())
  }).catch((error) => next(error))

})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  return (
    Person
      .findById(req.params.id)
      .then((updatedPerson) => {
        const person = updatedPerson
        person.name = body.name
        person.number = body.number

        person
          .save()
          .then((savedPerson) => {
            res.json(savedPerson.toJSON())
          })
          .catch((error) => next(error))
      })
  )
})

// 3.2: info page
app.get('/api/info', (req, res, next) => {
  const reqDate = new Date()

  Person.countDocuments({}, (error, count) => {
    res.json({ info: `Phonebook has ${count} entries`, reqDate })
  }).catch((error) => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    console.log('Validation Error:', error.message)
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
