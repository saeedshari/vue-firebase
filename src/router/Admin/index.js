import Admin from '@/views/Admin/index.vue'
import Products from '@/views/Admin/Products/index.vue'
import Categories from '@/views/Admin/Categories/index.vue'

export default [
    {
        path:'/admin',
        name:'admin',
        component:Admin,
        children:[
            {
                path:'products',
                name:'products',
                component:Products,
            },
            {
                path:'categories',
                name:'categories',
                component:Categories,
            }
        ]
    }
]