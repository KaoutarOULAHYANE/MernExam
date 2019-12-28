const mongoose = require('mongoose');
/* import mongoose-paginate-v2 for pagination */
const mongoosePaginate = require('mongoose-paginate-v2');

/* get a new schema */
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  gender : { type: String, required: true },
  dob : { type: Date, required: true },
  news : { type : Boolean , required : true},
  email : { type : String , required : true},
  photo : { type : String , required : false}
}, {
  /* to add created_at and updated_at fileds */
  timestamps: true,
});

/* add the pgination plugin to my modele*/
userSchema.plugin(mongoosePaginate)
/* the name of the Class (line 18 routes/users.js) */
const User = mongoose.model('User', userSchema);

/* to import it in other file */
module.exports = User;