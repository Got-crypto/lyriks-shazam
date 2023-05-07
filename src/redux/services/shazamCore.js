import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('X-RAPIDAPI-KEY', process.env.REACT_APP_X_RAPIDAPI_KEY)
            
            return headers
        }
    }),
    endpoints: (builder) => ({
        getCharts: builder.query({query: () => '/charts/list'}),
        getTopSongs: builder.query({query: () => 'charts/track?locale=en-US&pageSize=20&startFrom=0'}),
        getSongDetails: builder.query({ query: ({ songid })=> `/songs/get-details?locale=en-US&key=${songid}`}),
        getSongRelated: builder.query({ query: ({ adamid }) => `/artists/get-top-songs?l=en-US&id=${adamid}` })
    })
})

export const {
    useGetChartsQuery,
    useGetTopSongsQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery
} = shazamCoreApi