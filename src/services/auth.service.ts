import  { BadRequest, ForBidden, UnAuthorized }  from "../libs/errors"
import {cartRepository, userRepository} from "../repositories"

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


interface SignUpPayload {
 body:{
  name:string,
  email:string ,
  password:String,
  role:string 
 },
 file :any,
}


interface SignInPayload {
  body:{
   email:string ,
   password:string,
  },
 }

export const signUp = async (payload:SignUpPayload) => {
  const { name, email, password ,role } = payload.body;

  const path  = payload?.file?.path || null;

  if (await userRepository.findOne({ email: email })) {
    throw new ForBidden("User alredy exists");
  }
 
  const user = await userRepository.create({
    name: name,
    email: email,
    password: password,
    profile_image : path,
    role : role
  });

  await cartRepository.create({
   user_id:user.id
  });
  
  return user;
};

const generateToken = (id:string) => {
  return jwt.sign({ id }, process?.env?.JWT_SECRET || "jwt Secret" , {
    expiresIn: "3d",
  });
};

export const signIn = async (payload:SignInPayload) => {
  const { email, password } = payload.body;

  if (!email || !password) {
    throw new BadRequest("data is not given");
  }

  const user:any= await userRepository.findOne({ email: email });
  if (!user) {
    throw new UnAuthorized("Need to register first");
  }
  const validate = await bcrypt.compare(password, user.password);

  if (!validate) {
    throw new UnAuthorized("Unauthorised access Password not matched!");
  }
 const cart= await cartRepository.findOne({
    user_id:user.id
   });
   
  return { token: generateToken(user.id), user: user ,cart:cart  };
};
