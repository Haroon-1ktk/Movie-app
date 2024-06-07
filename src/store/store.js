import { configureStore } from '@reduxjs/toolkit'
import Moviereducer from './movieslice'
export const store = configureStore({
  reducer: {
    moviedata:Moviereducer
  },
})