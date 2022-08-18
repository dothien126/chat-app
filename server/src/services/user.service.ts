import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import { errorMsg, isDataValid, notFoundMsg } from '../utils/myVariable';
import { IUser, User } from '../models/user.model';
import { DEFAULT_NO_AVATAR, errorUnknown, PATH_BASE_AVATAR } from '../utils/myVariable';

// create new user
export const createUser = async function (data: IUser): Promise<any> {
  try {
    // check user exist
    const user = await User.findOne({ email: data.email });
    if (user) {
      return notFoundMsg;
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(data.password, salt);

    // create user
    const newUser = new User({});
    newUser.username = data.username;
    newUser.email = data.email;
    newUser.password = hashed;
    newUser.avatar = data.avatar ? PATH_BASE_AVATAR + data.avatar : DEFAULT_NO_AVATAR;
    newUser.isAdmin = data.isAdmin ? data.isAdmin : false;
    await newUser.save();

    return newUser;
  } catch (e: unknown) {
    let err: string = '';
    if (e instanceof Error) {
      err = e.message;
    } else {
      err = errorUnknown;
    }
    return { error: err };
  }
};

// get all users without me
export const getAllUserExpelMe = async function (user: IUser): Promise<any> {
  try {
    // init value
    const condition: any = {};
    if (user._id) condition._id = { $nin: new mongoose.Types.ObjectId(user._id) };

    // get all users
    const users = await User.find(condition);

    if (users) {
      return users;
    } else {
      return notFoundMsg;
    }
  } catch (e: unknown) {
    let err: string = '';
    if (e instanceof Error) {
      err = e.message;
    } else {
      err = errorUnknown;
    }
    return { error: err };
  }
};

// find user
export const findUser = async function (data: IUser): Promise<any> {
  try {
    // init value
    let condition: any = {};
    if (data.username) condition.username = data.username;
    if (data.email) condition.email = data.email;

    // find user
    const user = await User.find(condition);

    if (user) {
      return user;
    } else {
      return notFoundMsg;
    }
  } catch (e: unknown) {
    let err: string = '';
    if (e instanceof Error) {
      err = e.message;
    } else {
      err = errorUnknown;
    }
    return { error: err };
  }
};

// update user
export const updateUser = async function (data: IUser): Promise<any> {
  try {
    // init value
    let condition: any = {};
    if (data.email) condition.email = data.email;

    // check user if exist will update
    const user = await User.findOne(condition);
    if (user) {
      user.username = data.username ? data.username : user.username;
      user.email = data.email ? data.email : user.email;
      user.avatar = data.avatar ? data.avatar : user.avatar;
      user.isAdmin = data.isAdmin ? data.isAdmin : user.isAdmin;
      await user.save();

      return user;
    } else {
      return notFoundMsg;
    }
  } catch (e: unknown) {
    let err: string = '';
    if (e instanceof Error) {
      err = e.message;
    } else {
      err = errorUnknown;
    }
    return { error: err };
  }
};

// delete user
export const deleteUser = async function (data: IUser): Promise<any> {
  try {
    // init value
    let condition: any = {};
    if (data._id) condition._id = new mongoose.Types.ObjectId(data._id);

    // check user if exist will delete
    const user = await User.findOneAndDelete(condition);
    if (user) {
      return user;
    } else {
      return notFoundMsg;
    }
  } catch (e: unknown) {
    let err: string = '';
    if (e instanceof Error) {
      err = e.message;
    } else {
      err = errorUnknown;
    }
    return { error: err };
  }
};

// login user
export const login = async (data: IUser) => {
  try {
    // init value
    let condition: any = {};
    if (data.email) condition.email = data.email;

    // find user exist
    const user = await User.findOne(condition);
    const userInfor = await User.findOne(condition).select('-password');
    if (user) {
      const validPassword = user && (await bcrypt.compare(data.password, user.password));
      if (!validPassword) {
        return isDataValid;
      }

      if (user && validPassword) {
        //Generate access token
        const secretOrKey = 'process.env.JWT_SECRET_KEY as string';
        const accessToken: string = jwt.sign(
          {
            id: user._id,
            email: user.email,
          },
          secretOrKey,
          { expiresIn: '1d' }
        );
        return { accessToken, userInfor };
      }
    } else {
      return notFoundMsg;
    }
  } catch (e: unknown) {
    let err: string = '';
    if (e instanceof Error) {
      err = e.message;
    } else {
      err = errorUnknown;
    }
    return { error: err };
  }
};
