import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { DetailsHeader, Error, Loader, RelatedSongs } from '../components'
import { useGetArtistDetailsQuery, useGetArtistTopSongsQuery, useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCore"

export default function ArtistDetails(){
    
    const { id: artistId } = useParams()

    const { activeSong, isPlaying } = useSelector( state => state.player )

    const {data: artistData, isFetching: isFetchingArtistDetails, error: artistError } = useGetArtistDetailsQuery({artistId})
    const {data: artistSongs, isFetching: isFetchingArtistTopSongs, error: artistTopSongsError } = useGetArtistTopSongsQuery({artistId})

    if( isFetchingArtistDetails || isFetchingArtistTopSongs ) return <Loader title='Searching artist details...' />

    if(artistError || artistTopSongsError) return <Error />

    return (
    <>
        {artistData && 
            <div className="flex flex-col">
                <DetailsHeader artistId={artistId} artistData={artistData} isArtistDetails={true} />
            
                <RelatedSongs 
                    data={artistSongs?.data}
                    artistId={artistId}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                />
            </div>
        }
    </>
    )
}