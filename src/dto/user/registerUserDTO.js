
export default class RegisterUserDTO {
    static getFrom = (user) =>{
        return {
            first_name: user.first_name,
            last_name:user.last_name,
            alias: user.alias,
            email:user.email,
            password:user.password,
            zona: user.zona,
          
        }
    }
}