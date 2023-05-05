import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { RiCloseLine } from 'react-icons/ri'

import { logo } from '../assets'
// import { loader } from '../assets'
// import { links } from '../assets/constants'

const NavLinks = () => {
    <div className='mt-10 '>
        {[].map(item => (
            <NavLink>
                {item.name}
            </NavLink>
        ))}
    </div>
}

export default function Sidebar(){
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    console.log('process.env.REACT_PUBLIC_X_RAPIDAPI_KEY', process.env.REACT_APP_X_RAPIDAPI_KEY)

    return (
        <div className='md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]'>
            <img  alt="logo" className='w-full h-14 object-contain' />
            <NavLinks />
        </div>
    )
}