const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  title: {
    type: String,
  },
  lists: [
    { 
      type: Schema.Types.ObjectId, 
      ref: 'List'
    }
  ],
},
{timestamps: true}
)

BoardSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

const Board = mongoose.model('Board', BoardSchema);

module.exports = Board;