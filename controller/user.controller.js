import bcrypt, { hash } from "bcrypt"
export const signup = async(req, res)=>{
    try {
        const hashcode = await bcrypt(hash, 10)
    } catch (error) {
        
    }
}