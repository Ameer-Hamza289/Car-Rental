import { emptySplitApi } from './emptySplitApi'

export interface LoginArgs {
  email: string
  password: string
}


export interface GuestSignUpArgs {
  name: string
  email: string
  password: string
  phone: string
  event:string
}
export interface SignUpArgs {
  name: string
  email: string
  password: string
  phone: string
}

export interface UpdateProfileArgs {
  username: string
  email: string
  password: string
  phone: string
}
export const userApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation<any, SignUpArgs>({
      query: ({ name, email, password, phone }) => {
        return {
          method: 'POST',
          url: '/api/auth/organizers',
          body: {
            name: name,
            email: email,
            password: password, 
            phone: phone
          }
        }
      },
      invalidatesTags:['My-Events','EventGuests','Profile']
    }),

    // guestSignUp: builder.mutation<any, any>({
    //   query: ({ name, email, password, phone,event }) => {
    //     return {
    //       method: 'POST',
    //       url: `/api/auth/guests/${event}`,
    //       body: {
    //         name: name,
    //         email: email,
    //         phone: phone,
    //         password: password
    //       }
    //     }
    //   },
    //   invalidatesTags:['EventGuests','Invitation','RSVP']
    // }),

    guestSignUp: builder.mutation<any, any>({
      query: ({ name, email, password, phone,event }) => {
        return {
          method: 'POST',
          url: `/api/auth/add-guest-to-event/${event}`,
          body: {
            name: name,
            email: email,
            phone: phone,
            password: password
          }
        }
      },
      invalidatesTags:['EventGuests','Invitation','RSVP']
    }),

    login: builder.mutation<any, LoginArgs>({
      query: ({ email, password }) => ({
        method: 'POST',
        url: '/api/auth/organizer-login',
        body: {
          email,
          password
        }
      })
    }),
   
    guestLogin: builder.mutation<any, LoginArgs>({
      query: ({ email, password }) => ({
        method: 'POST',
        url: '/api/auth/guest-login',
        body: {
          email,
          password
        }
      })
    }),

    deleteEventGuest: builder.mutation<any, any>({  
      query: (guestId) => ({
        url: `/api/auth/guest/${guestId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['EventGuests'],
    }),
   
   
    getOrganizerProfile: builder.query<any, any>({
      query: (id) => `/api/auth/organizers/${id}`,
      providesTags: ['OrganizerProfile']

    }),
   
    getGuestProfile: builder.query<any, any>({
      query: (id) => `/api/auth/guest/${id}`,
      providesTags: ['GuestProfile']

    }),

    getAllRSVP: builder.query<any, void>({
      query: () => '/api/rsvps',
      providesTags: ['RSVP']

    }),
    updateProfile: builder.mutation<any, UpdateProfileArgs>({
      query: ({ username, email,phone, password }) => {
        const formData = new FormData()

        formData.append('username', username)
        formData.append('email', email)

        formData.append('password',password )
        formData.append('phone',phone)

       

        return {
         
          method: 'POST',
          url: `/api/auth/update-profile`,
          body: formData
        }
      },
      invalidatesTags: ['Profile']
    }),

    updateOrganizer:builder.mutation<any,any>({
      query:({name,password,phone, id})=>({
        method: 'PUT',
        url: `/api/auth/organizers/${id}`,
        body: {
          name:name,
          password:password,
          phone:phone
        }
      }),
      invalidatesTags:['OrganizerProfile']

    }),

    updateGuest:builder.mutation<any,any>({
      query:({name,password,phone, id})=>({
        method: 'PUT',
        url: `/api/auth/organizer/${id}`,
        body: {
          name:name,
          password:password,
          phone:phone
        }
      }),
      invalidatesTags:['GuestProfile']

    })

    // updateProfile: builder.mutation<any, UpdateProfileArgs>({
    //   query: ({ username, email, password,phone }) => ({
    //     method: 'POST',
    //     url: `/api/auth/update-profile`,
    //     body: {
    //       username,
    //       email,
    //       password,
    //       phone
    //     }
    //   })
    // })
  })
})

export const {
  useSignUpMutation,
  useGuestSignUpMutation,
  useLoginMutation,
  useGuestLoginMutation,
  // useGetMyProfileQuery,
    useUpdateProfileMutation,
    useDeleteEventGuestMutation,
    useGetAllRSVPQuery,
    useGetGuestProfileQuery,
    useGetOrganizerProfileQuery,
    useUpdateOrganizerMutation,
    useUpdateGuestMutation
} = userApi
