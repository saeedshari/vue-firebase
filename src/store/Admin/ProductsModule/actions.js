import 
    {addToCollection,
    getCollection,
    deleteFromCollection,
    updateDocument
    } from "@/firebase/Methods/firestore";
import {PRODUCTS} from "@/firebase/Const/firestore.js"
import {uploadToStorage} from '@/firebase/Methods/storage';

    
export default {
     /*------------ products Actions-------------- */
    submitProducts({ commit, state }, {file,product}) {
        //console.log(typeof file)
        return uploadToStorage(file).then(imageUrl=>{
            return addToCollection(PRODUCTS,{...product,imageUrl})
            .then((doc)=>{
                commit(
                    "updateProducts",
                    state.products.concat(Object.assign({}, {...product,imageUrl},{id:doc.id}))
                );
            });
        })
    },
    editProductForm({ commit, state }, {product,id,file}) {
        //console.log(typeof file)
        const uploadImage = file ? uploadToStorage(file) : Promise.resolve(null)
        return uploadImage.then(imageUrl=>{
            const productObj = {...product}
            if (imageUrl) productObj["imageUrl"]=imageUrl
            console.log(id)
            return updateDocument(PRODUCTS,id,productObj)
            .then(()=>{
                commit(
                    "updateProducts",
                    state.products.map(product =>{
                        if(product.id == id){
                            return Object.assign({},product,productObj)
                        }
                        return product
                    })
                );
            });
        })
    },

    getProducts({ commit }) {
        getCollection(PRODUCTS)
        .then((querySnapshot) => {
            let products = querySnapshot.docs.map((queryDoc) =>
            Object.assign({}, queryDoc.data(), { id: queryDoc.id })
            );
            commit("updateProducts", products);
        });
    },

    async deleteProducts({ commit, state }, productId) {
        await deleteFromCollection(PRODUCTS,productId)
        let updateAfterDelete = state.products.filter(
            (Product) => Product.id != productId
        );
        commit("updateProducts", updateAfterDelete);
        },
        /*------------ End products Actions-------------- */
    }