import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        user: JSON.parse(sessionStorage.getItem('user')),
        isLogin: sessionStorage.getItem('user')?true:false
    },
    reducers:{
        setUserLogin: (state, action) => {
            console.log(action.payload)
            state.user = action.payload
            state.isLogin = true
        },
        setUserLogout: (state, action) => {
            state.user = "Người dùng"
            state.isLogin = false
            sessionStorage.clear()
        }
    }
})

export const { setUserLogin, setUserLogout } = userSlice.actions
export default userSlice.reducer;