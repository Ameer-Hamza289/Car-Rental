import { emptySplitApi } from './emptySplitApi'


export const userApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
      createEvent: builder.mutation<any, any>({
        query: ({ name,venue,description,starting_time,ending_time,schedule,org_id }) => {
          return {
            method: 'POST',
            url: '/api/events',
            body: {
                org_id:org_id,
              name: name,
              venue:venue,
        schedule:schedule,
        starting_time:starting_time,
        ending_time:ending_time,
        description:description
            }
        }
    },
    invalidatesTags: ['Events','My-Events']
      }),
  
     
      getAllEvents: builder.query<any, void>({
        query: () => '/api/events',
        providesTags: ['Events']
  
      }),

      getEventGuests:builder.query<any,any>({
        query:(evId)=>`/api/events/${evId}/guests`,
        providesTags:['EventGuests']
      }),

      getMyEvents: builder.query<any, any>({
        query: (org_id) => `/api/events-by-organizer/${org_id}`,
        providesTags: ['My-Events']
  
      }),
      deleteEvent: builder.mutation<void, any>({  
        query: (eventId) => ({
          url: `/api/events/${eventId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['My-Events','Events'],
      }),

      getEventById:builder.query<any,any>({
        query:(evId)=>`/api/events/${evId}`,
        providesTags:['EventById']
      }),
    
   
    })
  })
  
  export const {
    useCreateEventMutation,
    useGetAllEventsQuery,
    useGetMyEventsQuery,
    useDeleteEventMutation,
    useGetEventGuestsQuery,
    useGetEventByIdQuery
    
  } = userApi