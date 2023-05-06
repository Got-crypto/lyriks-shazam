import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { RiCloseLine } from 'react-icons/ri'

import logo from '../assets/logo.png'
import { links } from '../assets/constants'

const NavLinks = ({handleClick}) => {
    return <div className='mt-10 '>
        {links.map(item => (
            <NavLink 
                key={item.name}
                to={item.to}
                onClick={ ()=> handleClick && handleClick()}
                className='flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400'
            >
                <item.icon className='w-6 h-6 mr-2' />   
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
            <img src={logo} alt="logo" className='w-full h-14 object-contain' />
            <NavLinks />
        </div>
    )
}