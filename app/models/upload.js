require('dotenv').config()
const mongoose = require('mongoose')

const uploadSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
  toObject
  toJSON
})

// Virtual property that generates the URL location
uploadSchema.virtual('fileUrl').get(function () {
  // generating
  const url = 'https://' + process.env.BUCKET_NAME + '.s3.amazonaws.com/' + this.fileName
  // return the value
  return url
})
module.exports = mongoose.model('Upload', uploadSchema)
