import 
    {addToCollection,
    getCollection,
    deleteFromCollection,
    updateDocument
    } from "@/firebase/Methods/firestore";
import {CATEGORIES} from "@/firebase/Const/firestore.js"

export default {
     /*------------ Category Actions-------------- */
    async submitCategory({ commit, state }, userCategory) {
        await addToCollection(CATEGORIES,userCategory)
        .then((doc)=>{
            commit(
                "updateCategories",
                state.categories.concat(Object.assign({}, userCategory,{id:doc.id}))
            );
        });
    },
    async editCategory({ commit, state }, {userCategory,id}) {
        await updateDocument(CATEGORIES,id,userCategory)
        .then(()=>{
            commit(
                "updateCategories",
                state.categories.map(category =>{
                    if(category.id == id){
                        return Object.assign({},category,userCategory)
                    }
                    return category
                })
            );
        });
    },

    getCategories({ commit }) {
        getCollection(CATEGORIES)
        .then((querySnapshot) => {
            let categories = querySnapshot.docs.map((queryDoc) =>
            Object.assign({}, queryDoc.data(), { id: queryDoc.id })
            );
            commit("updateCategories", categories);
        });
    },

    async deleteCategory({ commit, state }, categoryId) {
        await deleteFromCollection(CATEGORIES,categoryId)
        let updateAfterDelete = state.categories.filter(
            (cate) => cate.id != categoryId
        );
        commit("updateCategories", updateAfterDelete);
        },
        /*------------ End Category Actions-------------- */
    }