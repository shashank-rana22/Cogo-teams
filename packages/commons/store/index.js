import {configureStore} from "@reduxjs/toolkit"
import partnerIdReducer from "./partnerId"

const store=configureStore({
    reducer:{
        partnerIdStore:partnerIdReducer
    }
})

export default store