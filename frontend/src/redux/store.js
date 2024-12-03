import { configureStore } from '@reduxjs/toolkit'
import { ProfileSlice } from './slices/ProfileSlice.js'

export const store = configureStore({
  reducer: {
    checkAuth: ProfileSlice.reducer,
  },
})