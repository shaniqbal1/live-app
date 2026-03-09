


import mongoose from "mongoose";
import bcrypt from "bcryptjs";



const userSchema = new mongoose.Schema({

  name:{
    type:String
  },

  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true
  },

  password:{
    type:String,
    select:false
  },

  gender:{
    type:String,
    enum:["male","female","other"],
    required:true
  },

  isVerified:{
    type:Boolean,
    default:false
  },

  googleId:String,

  provider:{
    type:String,
    enum:["local","google"],
    default:"local"
  }

});

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;  // no next()

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);

