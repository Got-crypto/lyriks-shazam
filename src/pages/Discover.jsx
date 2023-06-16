import { Error, Loader, SongCard } from '../components'
import { useDispatch, useSelector } from 'react-redux'

import { useGetChartsQuery, useGetTopSongsQuery } from '../redux/services/shazamCore'

import { selectGenreListId } from '../redux/features/playerSlice'

export default function Discover(){

    const dispatch = useDispatch()

    const {activeSong, isPlaying, genreListId} = useSelector( state => state.player )

    const {data: genres, isFetching, error} = useGetChartsQuery()
    const {data: songs} = useGetTopSongsQuery()
    const genreTitle = 'pop'

    if(isFetching) return <Loader title='Loading songs... ' />
    
    if (error) return <Error error={error?.error} />

    return(
        <div className='flex flex-col'>
            <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10 '>
                <h2 className='font-bold text-3xl text-white text-left'>Discover {genreTitle}</h2>
                <select
                    onChange={(e)=>dispatch(selectGenreListId(e.target.value))}
                    value=''
                    className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'
                >
                    {
                        genres?.global.genres.map(genre => <option key={genre.id}>{genre.name}</option>)
                    }
                </select>
            </div>
            <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                {
                    songs?.tracks.map( (song, i) => (
                        <SongCard
                            key={song.key}
                            song={song}
                            i={i}
                            data={songs}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                        />
                    ) )
                }
            </div>
        </div>
    )
}