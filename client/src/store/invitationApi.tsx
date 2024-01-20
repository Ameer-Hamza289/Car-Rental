import { emptySplitApi } from './emptySplitApi'


export const invitationApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
      getAllInvitations: builder.query<any, any>({
        query: ( gu_id ) => `/api/invitations-by-guest/${gu_id}`,
    providesTags: ['Invitation']
}),

changeStatus:builder.mutation<any,any>({
    query: ({ status,id,gu_id, ev_id}) => ({
        method: 'PUT',
        url:    `/api/update-status/${id}`,
        body: {
         status:status,
         gu_id:gu_id,
         ev_id:ev_id
        }
      }
      ),
      invalidatesTags:['Invitation','RSVP']
}),

addComment:builder.mutation<any,any>({
    query: ({ comment,ev_id, gu_id}) => ({
        method: 'PUT',
        url:    `/api/add-comment`,
        body: {
        comment:comment,
        ev_id:ev_id,
        gu_id:gu_id
        }
      }
      ),
      invalidatesTags:['RSVP']
}),
   
    })
  })
  
  export const {
    useGetAllInvitationsQuery,
    useChangeStatusMutation,
   useAddCommentMutation
    
  } = invitationApi