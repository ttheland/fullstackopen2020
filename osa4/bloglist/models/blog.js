const mongoose = require('mongoose')

const blogSchema =  mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5
  },
  author: String,
  likes: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true,
    minlength: 8
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
