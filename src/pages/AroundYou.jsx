import { useState, useEffect } from "react"
import axios from "axios"
import { useSelector } from "react-redux"

import { Error, Loader, SongCard } from '../components'

export default function AroundYou(){
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(true);
    const { activeSong, isPlaying } = useSelector(({player}) => player);

    useEffect(() => {
        const getLocation = async () => {
            try {
                const response = await axios.get(`https://geo.ipify.org/api/v2/country?apiKey=${process.env.REACT_APP_GEO_IPIFY_KEY}`)
            setCountry(response?.data?.location)
            } catch (error) {
                console.log('error', error)
            } finally {
                setLoading(false)
            }
        }

        getLocation()
    }, [country])

    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10 ">Around You <span className="font-black">{country?.country}</span></h2>

            <div className="flex flex-wrap sm:justify-start justify-center gap-8 text-white">
                <p>Coming soon...</p>
            </div>
        </div>
    )
}