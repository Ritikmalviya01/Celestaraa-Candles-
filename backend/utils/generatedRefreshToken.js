import jwt from 'jsonwebtoken'
import UserModel from '../models/user.models.js'

const generatedRefreshToken = async (userId) =>{
   const token = await jwt.sign( { _id :userId}, process.env.SECRET_KEY_REFRESH_TOKEN , {expiresIn : '30d'}
      )
      const updateRefreshToken = await UserModel.updateOne(
        {_id : userId},
        {
            refresh_token : token
        }
      )
      return token
}
export default generatedRefreshToken