const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, "A user is required"] },
  event: { type: Schema.Types.ObjectId, ref: 'Event', required: [true, "An event is required"] },
  response: { type: String, required: [true, 'Status is required'], enum: ['YES', 'NO', 'MAYBE'] }
});

module.exports = mongoose.model('Rsvp', rsvpSchema);