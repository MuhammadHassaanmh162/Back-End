import {asyncHandler} from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiErrors.js'
import {User} from '../models/user.model.js'
import { uploadOnCloudinary } from '../utils/Cloudinary.js'
import {ApiResponse} from '../utils/ApiResponse.js'

const registerUser = asyncHandler ( async(req,res)=>{
    // res.status(200).json({
    //     message: 'ok'
    // })

    const {userName, fullName, email , password} = req.body

    console.log("Email : ",email);

    if( [userName,fullName, email, password].some((fields)=> fields?.trim() === "")){
        throw new ApiError(400, "All Fields Are Required");
    }
    const existingUser = await User.findOne({
        $or: [{ userName },{ email }]
    });

    if(existingUser){
        throw new ApiError(409, "User Already Exist");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required");
    }
    const avatar =  await uploadOnCloudinary(avatarLocalPath)
    const coverImage =  await uploadOnCloudinary(coverImageLocalPath)
    if(!avatar){
        throw new ApiError(400, "Avatar is required");
    }
    const user = await User.create({
        userName: userName.toLowerCase(),
        fullName: fullName.toLowerCase(), 
        email, 
        password, 
        avatar: avatar.url, 
        coverImage: coverImage?.url || ""
    });
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(404, "User Not Created");
    }

})

export {registerUser};