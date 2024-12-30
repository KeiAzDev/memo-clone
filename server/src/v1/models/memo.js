import mongoose from 'mongoose';

const memoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  icon: {
    type: String,
    default: '📝',
  },
  title: {
    type: String,
    default: '無題',
  },
  description: {
    type: String,
    default: 'ここになんでも書いてね',
  },
  position: {
    type: Number,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  favoritePosition: {
    type: Number,
    default: 0,
  },
});

const Memo = mongoose.model('Memo', memoSchema);

export default Memo;