const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('Connecting to', url)
mongoose.connect(url)
  .then(console.log('Connected to MongoDB'))
  .catch((error) => {
    console.log('error connecting to MongoDB: ', error.message)
  })

function numberValidator(value) {
  const parts = value.split('-')
  if (parts.length !== 2) return false
  if (parts[0].length < 2 || parts[0].length > 3) return false
  if ((parts[0].length + parts[1].length) >= 7 ) return true
}
const numberValidatorMsg = [numberValidator, 'The number entered is not in the correct format']

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
    validate: numberValidatorMsg
  }
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', contactSchema)

