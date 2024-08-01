import { Request, Response } from "express";
import User from "../models/user.model";

const createCurrentUser = async (req: Request, res: Response) => {
    try {
        const { auth0Id } = req.body;
        const existingUser = await User.findOne({ auth0Id });

        // 1. check if the user exists
        if(existingUser){
            return res.status(200).send({ message: "User already exists"}); 
        }

        const newUser = new User(req.body); // 2. create a new user
        await newUser.save();  

        return res.status(201).json(newUser.toObject());  // 3. return the user object to the calling client
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : " Error creating User"})
        
    }
};

const updateCurrentUser = async (req: Request, res: Response) => {
    try {
        const { name, addressLine1, country, city } = req.body;
        const user = await User.findById(req.userId);

        if(!user){
            return res.status(401).send({message : "User not Found"});
        }

        user.name = name;
        user.addressLine1 = addressLine1;
        user.country = country;
        user.city = city;

        await user.save();
        return res.send(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Error in Updating User"})
    }
}

const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const currentUser = await User.findOne({_id: req.userId});
        if(!currentUser){
            return res.status(404).json({ message: "User not found"})
        }
        res.json(currentUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message : "Unable to get current user"});
    }
}

export default {
    createCurrentUser,
    updateCurrentUser,
    getCurrentUser
};