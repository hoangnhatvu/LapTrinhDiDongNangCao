import * as mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
  template_name: {
    type: String,
    required: true,
  },

  template_image: String,

  description: String,

  view_number: {
    type: Number,
    default: 0,
  },

  is_active: {
    type: Boolean,
    default: true,
  },

  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  created_date: {
    type: Date,
    default: Date.now,
  },

  updated_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  updated_date: Date,

  updated_token: String,

  is_deleted: {
    type: Boolean,
    default: false,
  },
});

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
