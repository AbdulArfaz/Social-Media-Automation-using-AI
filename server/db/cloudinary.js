import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()


const uploadOnCloudinary = async (localFilePath) => {

cloudinary.config({
   cloud_name: String(process.env.CLOUDINARY_CLOUD_NAME).trim(),
   api_key: String(process.env.CLOUDINARY_API_KEY).trim(),
   api_secret: String(process.env.CLOUDINARY_API_SECRET).trim(),
   secure: true,
})
    try {
        if(!localFilePath) return null

        const absolutePath = path.resolve(localFilePath)

        console.log("uploading file to cloudinary:",absolutePath);
       const response = await cloudinary.uploader.unsigned_upload(absolutePath,"doc_preset",{
            resource_type: "auto",
            timeout: 120000
            
        })
        
          if(fs.existsSync(localFilePath)){
        fs.unlinkSync(localFilePath)
        }
        return response

    } catch (error) {
         
    console.log("Cloudinary Detailed Error: ", JSON.stringify(error, null, 2));
    
    
        if(fs.existsSync(localFilePath)){
        fs.unlinkSync(localFilePath)
        }
        return null
    }
}
export default uploadOnCloudinary 