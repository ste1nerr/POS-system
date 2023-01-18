import {configureStore} from '@reduxjs/toolkit'
import {dishesReducer} from './slices/dishes'
const store = configureStore({
    reducer: {
        posts: dishesReducer
    }
})


export default store;