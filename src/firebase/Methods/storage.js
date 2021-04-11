import {storage} from '../index';
import {PRODUCTS} from '../Const/firestorage';
export const uploadToStorage = (file)=>{
    const fileRef = storage.ref(`${PRODUCTS}/${file.lastModified + file.name}`);
    return fileRef.put(file).then(res => res.ref.getDownloadURL())
}