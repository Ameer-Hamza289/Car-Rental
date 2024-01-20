import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const emptySplitApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5001',
    prepareHeaders: (headers, { getState }: any) => {
      headers.set('accept', 'application/json')
      try {
        // const { token } = getState().reducer.user
        console.log('getState', getState)
        const token = window.localStorage.getItem('accessToken')
        if (token) {
          headers.set('authorization', `Bearer ${token}`)
        } else {
          headers.set('authorization', '')
        }
      } catch (err) {
        headers.set('authorization', '')
      }

      return headers
    }
  }),
  endpoints: () => ({}),
  tagTypes: [
    'Profile',
    'Events',
    'EventGuests',
    'My-Events',
    'Invitation',
    'RSVP',
    'GuestProfile',
    'OrganizerProfile',
    'EventById'
    
  ]
})
