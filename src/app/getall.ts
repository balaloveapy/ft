import { listAll, ref, uploadBytes } from "firebase/storage"
import { storage } from "./firebase"
import {v4 as uuidv4} from 'uuid'
type Photo = {
    name: string,
    url: string
}
export const valores = async (valores:any) => {
    let randomName = uuidv4()
    let newfile = ref(storage,`fts/${randomName}`)
    let upload =await uploadBytes(newfile,valores)
    upload.metadata
}