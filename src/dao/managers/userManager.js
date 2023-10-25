import userModel from "../models/userModel.js";


export default class UserManager{
    getUsers= ()=>{
        return userModel.find().lean()
    }

    getUser=(params,user)=>{
        return userModel.findOne({[params]: user}).lean()
    }

    getUserById=(uid)=>{
        return userModel.findById(uid)
    }
    
    updateUserBy = (params, user, newData) => {
        return userModel.findOneAndUpdate({ [params]: user }, newData, { new: true });
    }
  

    uptateUserRole=(userId, newRole)=>{
        return userModel.findByIdAndUpdate(userId, { role: newRole }, { new: true })
    }
    updateUserLastConection=(userId, newConection)=>{
        return userModel.findByIdAndUpdate(userId, { last_conection: newConection }, { new: true })
    }

    updateUserExpiration=(userId, newExpiration)=>{
        return userModel.findByIdAndUpdate(userId, { expiration: newExpiration }, { new: true })
    }
    createUser=(user)=>{
        return userModel.create(user)
    }

    updateUser=(uid, user)=>{
        return userModel.findByIdAndUpdate(uid, {$set: user})
    }

    deleteUser=(uid)=>{
        return userModel.findByIdAndDelete(uid)
    }

}