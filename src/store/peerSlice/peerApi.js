import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { Buffer } from "buffer"

export const peerApi = createApi({
    reducerPath: 'peerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().peer.securityToken
            if(token){
                headers.set('Authorization', 'Basic ' + Buffer.from(token).toString('base64'))
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        getPeerInfo: builder.query({
            query: ({nodeApi}) => ({
                url: `${nodeApi}/api/v2/account/addresses`,
            }),
        }),
        sendMessage: builder.mutation({
            query: ({nodeApi, recipient, msg}) => ({
                url: `${nodeApi}/api/v2/messages`,
                method: 'POST',
                data: JSON.stringify({
                    recipient,
                    msg
                })
            })
        })
       
    })
})

export const {useGetPeerInfoQuery, useSendMessageMutation} = peerApi;