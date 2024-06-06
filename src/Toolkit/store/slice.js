import { configureStore } from "@reduxjs/toolkit"
import todoSlice from "../Slice/todoSlice"



const store = configureStore({
    reducer: {
        todo:todoSlice
    }
})


export default store
