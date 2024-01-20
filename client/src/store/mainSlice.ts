import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {
    loading: false,
    detail: null,
    token: null,
    error: null
  }
}

export const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    signedUp: (state, { payload }) => {
      state.user = {
        ...state.user,
        token: payload.jwt,
        detail: payload.user
      }
    },
    loggedIn: (state, { payload }) => {
      state.user = {
        ...state.user,
        token: payload.jwt,
        detail: payload.user,
        error: null
      }
    },
    setAuthError: (state, { payload }) => {
      state.user = {
        ...state.user,
        error: payload
      }
    },
    setProfile: (state, { payload }) => {
      state.user = {
        ...state.user,
        detail: payload.user
      }
    },
    logout: state => {
      state.user = {
        ...initialState.user
      }
    }
  }
})

export const { signedUp, loggedIn, setAuthError, setProfile, logout } = mainSlice.actions

export default mainSlice.reducer
