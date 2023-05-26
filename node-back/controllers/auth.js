const User=require('../models/user');
const jwt=require('jsonwebtoken');
const {expressjwt:expressjwt}=require('express-jwt')
exports.signup=async(req,res)=>{
    const userExists=await User.findOne({email:req.body.email});
    if(userExists) return res.status(403).json({
        error:"Email is Taken!"
    });
    const user=await new User(req.body)
    console.log(user)
    await user.save()
    res.status(200).json({message:"signUp success! please Login"});
};
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: "User with that email does not exist. Please Sign UP",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "User and email do not Match.",
      });
    }
    const token = jwt.sign({ _id: user._id }, "gfgdfgdfg545hgfdg");
    res.cookie("t", token, { expire: new Date() + 9999 });
    const { _id, name } = user;
    return res.json({ token, user: { _id, email, name } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.signOut=(req,res)=>{
    res.clearCookie("t")
    return res.json({message:"SignOut success"})
}

exports.requireSignin=expressjwt({
secret:'gfgdfgdfg545hgfdg',
algorithms:["HS256"],
userProperty:"auth"
})
