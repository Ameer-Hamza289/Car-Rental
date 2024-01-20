import { configureStore } from '@reduxjs/toolkit'
import { emptySplitApi } from './emptySplitApi'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import mainReducer from './mainSlice'

const persistConfig = {
  key: 'root',
  storage
}


const persistedReducer = persistReducer(persistConfig, mainReducer)

const store = configureStore({
  reducer: {
    reducer: persistedReducer,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(emptySplitApi.middleware)
})

const persistor = persistStore(store)

export { store, persistor }
