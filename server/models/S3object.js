const mongoose = require('mongoose');

const { Schema } = mongoose;

const s3objectSchema = new Schema({
      signedRequest: {
        type: String,
      },
      URL: {
        type: String
      },
});

const S3object = mongoose.model('S3object', s3objectSchema);

module.exports = S3object;