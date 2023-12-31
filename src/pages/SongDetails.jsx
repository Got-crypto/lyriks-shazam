import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { DetailsHeader, Error, Loader, RelatedSongs } from '../components'
import { playPause, setActiveSong } from "../redux/features/playerSlice"
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCore"

export default function SongDetails(){
    
    const dispatch = useDispatch()
    const { songid } = useParams()

    const { activeSong, isPlaying } = useSelector( state => state.player )

    const { data: songData, isFetching: isFetchingSongDEtails, error: isFetchingSongError } = useGetSongDetailsQuery({ songid })

    const adamid = songData?.artists[0]?.adamid

    const { data: songRelatedData, isFetching: isFetchingRelatedSong, error: songRelatedError } = useGetSongRelatedQuery({ adamid })

    const handlePauseClick = () => {
        dispatch(playPause(false))
    }

    const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({song, songRelatedData, i}))
        dispatch(playPause(true))
    }

    if( isFetchingRelatedSong || isFetchingSongDEtails ) return <Loader title='Searching song details...' />

    if(isFetchingSongError || songRelatedError) return <Error />

    return (
        <div className="flex flex-col">
            <DetailsHeader artistId="" songData={songData} />
        
            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

                <div className="mt-5">
                    {
                        songData?.sections[1].type === 'LYRICS' ? songData?.sections[1].text.map( (bar, i) => {
                            return <p className="text-gray-400 text-base my-1" key={i}>
                                {bar}
                            </p>
                        } ) : <p>Sorry, no lyrics found!</p>
                    }
                </div>
            </div>
            <RelatedSongs 
                data={songRelatedData?.data}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
            />
        </div>
    )
}