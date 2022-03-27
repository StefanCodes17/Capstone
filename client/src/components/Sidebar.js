import React, { useState } from 'react';
import "../assets/tailwind.css"
import DocTree from './DocTree';
import {Link } from 'react-router-dom'
import Hamburger from './Hamburger'

export default function Sidebar(){
    const [isOpen, setIsOpen] = useState(false);

    return(
        <>
        <Hamburger isOpen={isOpen} setIsOpen={setIsOpen}/>
        <div className={`bg-sidebar_background_color w-80 h-[45rem] shadow-xl ${isOpen?'translate-x-0':'-translate-x-full'} ease-in-out duration-300`}>
                    <Link to="/editor">
                        <button 
                        className="bg-sidebar_newBtn_color hover:bg-gray-900 text-black hover:text-lifepad_green font-bold w-full border-b-4 border-black hover:border-lifepad_green rounded"
                        >
                            <h2 className="absolute top-1 right-28 font-serif text-3xl ">
                                New
                            </h2>
                            <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24.5 34.7083V14.2917" stroke="#2DDF9F" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M14.2916 24.5L34.7083 24.5" stroke="#2DDF9F" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M0 0V-1H-1V0H0ZM49 0H50V-1H49V0ZM49 49V50H50V49H49ZM0 49H-1V50H0V49ZM0 1H49V-1H0V1ZM48 0V49H50V0H48ZM49 48H0V50H49V48ZM1 49V0H-1V49H1Z" fill="#2DDF9F"/>
                            </svg>
                        </button>
                    </Link>
                    <DocTree>
                    </DocTree>
            </div>
    </>
    )
}