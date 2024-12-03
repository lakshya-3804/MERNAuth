import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false
}

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setIsLoggedIn: (state,action) => {
      state.isLoggedIn = action.payload;
    },
  },
})

export const { setIsLoggedIn } = ProfileSlice.actions
export default ProfileSlice.reducer
