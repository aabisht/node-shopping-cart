import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    username: {
      type: String,
      require: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      require: [true, "Email address is required"],
      unique: true,
    },
    password: { type: String, require: [true, "Password is reqired"] },
  },
  { timestamps: true },
);

// Hash password before sawing the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
