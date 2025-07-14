import {
    createUserInput,
    googleAuthInput,
    updateAuth,
    updatePasswordInput,
    updateUserInput,
    userDocument,
    userFilter
} from "../../common/interfaces/user";
import { userModel } from "../../models/usersSchema";
import createError from "http-errors";
import { Types, FilterQuery, QueryOptions } from "mongoose";
import { validateAuthData, validateProfileData } from "./validateUserData";
import * as helpers from "../../helpers/helper";
import * as mentorship from "../../common/interfaces/mentorship/index";
import * as mentor from "../../common/interfaces/mentor/index";
import * as mentee from "../../common/interfaces/mentee/index";

/**
 * create a new in the database with phone and 
 * password, then create auth record 
 * @param data required user data 
 * @returns saved user 
 */
export const createUser = async (data: createUserInput) => {
    await validateAuthData(data);
    const hashedPassword = await helpers.hashPassword(data.password as string);
    const user = await userModel.create({ ...data, password: hashedPassword });
    if(!user) {
        throw new createError.InternalServerError("Could not create user");
    }
    return user;
};

/**
 * create a new user in the database with google data for those signing in with google 
 * @param data required user data 
 * @returns create user 
 * @throws 500 if user could not be created
 */
export const createGoogleUser = async (data: googleAuthInput) => {
    const user = await userModel.create({ ...data });
    if (!user) {
        throw new createError.InternalServerError("Could not create user"); 
    }
    return user; 
};

/**
 * checks if user already exists with the phone number 
 * @param phone user's phone number 
 * @throws 409 if the user already exists 
 */
export const checkUserExists = async (phone: string) => {
    if (await userModel.exists({ phone })) {
        throw new createError.Conflict("User already exists");
    }
};

/**
 * find a user from a database by id
 * @param id user's id 
 * @returns found user 
 * @throws 404 if no user found with the id 
 * @throws 400 if the id is invalid
 */
export const getUserById = async (id: string | Types.ObjectId) => {
    if(!Types.ObjectId.isValid(id))
        throw new createError.BadRequest("Invalid user id");
    const user = await userModel.findById({ _id: id}, { password: 0, __v: 0 }, null);
    if (!user) throw new createError.NotFound("user not found");
    return user; 
};

/**
 * find a user from the database by email
 * @param email user's email
 * @retuns found user 
 * @throws 404 if no user found with the email
 */
export const findUserByEmail = async (email: string) => {
    return await userModel.findOne({ email });
};

/**
 * get a user by phone number 
 * @param phone user's phone number 
 * @returns user
 * @throws 404 if no user found with the phone 
 */
export const getUserByPhone = async (phone: string) => {
    if(!(await userModel.exists({ phone }))) {
        throw new createError.NotFound("User not found with phone number");
    }   
    const user = await userModel.findOne({ phone });
    if(!user) throw new createError.NotFound("User not found");
    return user;
};

/**
 * find the user by id and update the user's isAuthenticated 
 * field to true after verification
 * @param id user's id 
 * @returns boolean true 
 * @throws 404 if no user found with the id 
 * @throws 400 if the id is invalid 
 */
export const updatIsAuthenticated = async ({ id, opt }: updateAuth) => {
    const user = await userModel.findByIdAndUpdate(
        { _id: id},
        { isAuthenticated: opt },
        { new: true, select: "-password" }
    );
    if (!user) throw new Error("Internal server error");
    return user; 
}; 

/**
 * find a user by id and update the user's profile data 
 * @param id id of the user 
 * @param data data to be updated
 * @returns updated user 
 * @throws 404 if no user found with the id 
 * @throws 400 if the id is invalid 
 */
export const getUserByIdAndUpdate = async (data: updateUserInput) => {
    if (!Types.ObjectId.isValid(data.id)) throw new createError.BadRequest("Invalid user id");
    await validateProfileData(data);
    const user = await userModel.findByIdAndUpdate(
        { _id: data.id },
        { ...data },
        { new : true }
    );
    if (!user) throw new createError.NotFound("No found with this id");
    return true;
};

/**
 * find a user by id and update the user's password
 * @param data data to be updated
 * @returns updated user
 */
export const getUserByIdUpdatePassword = async (data: updatePasswordInput) => {
    if (!Types.ObjectId.isValid(data.id)) throw new createError.BadRequest("Invalid user id");

    const user = await userModel.findByIdAndUpdate({ _id: data.id },{ ...data },{ new: true });

    if (!user) throw new createError.NotFound("User not found");
    return true; 
};

/**
 * find a user by id and delete the user 
 * @param id id of the user
 * @return deleted user 
 * @throws 404 if no user found with id 
 * @throws 400 if the id is invalid 
 */
export const findByIdAndDelete = async (id: string | Types.ObjectId) => {
    if (!Types.ObjectId.isValid(id)) throw new createError.BadRequest("Invalid user id");

    const user = await userModel.findByIdAndDelete({ _id: id });

    if(!user) throw new createError.NotFound("No user found with this id");

    if (user.role === "Mentor") {
        await mentor.deleteMentorData(id);
        await mentorship.deleteAllRequest(id);
    }
    if(user.role === "Mentee") {
        await mentee.deleteMenteeData(id);
        await mentorship.deleteAllRequest(id);
    }
    return user;
};

/**
 * get all users by roles and fliter 
 * by fullName, programmeOfStudy, level and sort them 
 * @param filter.role - role of the user 
 * @param filter.search - search string 
 * @param filter.limit - limit number 
 * @param filter.page - page number 
 * @param filter.sort - sort queries 
 * @returns mentees or mentors 
 */
export const getMentorsOrMentees = async(filter: userFilter) => {
    const query: FilterQuery<userDocument> = { 
        ...(filter.role  && { role: filter.role} ),
        ...(filter.fullName && { fullName: filter.fullName }),
        ...(filter.programmeOfStudy && {
            programmeOfStudy: filter.programmeOfStudy,
        }),
        ...(filter.level && { level: filter.level }),
        ...(filter.search && { 
            $or: [ 
                {fullName: { $regex: filter.search, $options: "1"} },
                {programmeOfStudy: { $regex: filter.search, $options: "1"} },
                {level: { $regex: filter.search, $options: "1"} },
                {about: { $regex: filter.search, $options: "1"} },
                {acadamicFields: { $regex: filter.search, $options: "1"} },
            ],
        }),
    };

    const limit = helpers.getSanitizeLimit(filter.limit);
    const page = helpers.getSanitizePage(filter.page);
    const skip = helpers.getSanitizeOffset(limit, page);
    const sort = helpers.getSanitizeSort(filter.sort);

    const options: QueryOptions = { skip, lean: true, limit: limit + 1, sort };

    const users = await userModel.find(query, { password: 0, __v: 0 }, options);

    return await helpers.getPageFormat(users, page, limit);
};

