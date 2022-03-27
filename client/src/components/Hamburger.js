import React from 'react'
import { Router } from 'react-router-dom'
import { login } from '../state/slices/userSlice'

const Hamburger = ({isOpen, setIsOpen}) => {
  return (
      <>
      <button className="absolute top-0 left-48 bg-red-50 z-50">
        {!isOpen ?
            (
                <svg 
                onClick={()=>setIsOpen(!isOpen)}
                width="54" height="53" viewBox="0 0 64 53" fill="none" xmlns="http://www.w3.org/2000/svg"
                >
                    <path fillRule="evenodd" clipRule="evenodd" d="M52.6667 26.5C52.6667 25.5853 51.7712 24.8437 50.6667 24.8437H13.3333C12.2288 24.8437 11.3333 25.5853 11.3333 26.5C11.3333 27.4147 12.2288 28.1562 13.3333 28.1562H50.6667C51.7712 28.1562 52.6667 27.4147 52.6667 26.5Z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M52.6667 15.4583C52.6667 14.5436 51.7712 13.8021 50.6667 13.8021H13.3333C12.2288 13.8021 11.3333 14.5436 11.3333 15.4583C11.3333 16.3731 12.2288 17.1146 13.3333 17.1146H50.6667C51.7712 17.1146 52.6667 16.3731 52.6667 15.4583Z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M52.6667 37.5417C52.6667 36.6269 51.7712 35.8854 50.6667 35.8854H13.3333C12.2288 35.8854 11.3333 36.6269 11.3333 37.5417C11.3333 38.4564 12.2288 39.1979 13.3333 39.1979H50.6667C51.7712 39.1979 52.6667 38.4564 52.6667 37.5417Z" fill="white"/>
                </svg>
            ):
            (
            <svg 
            onClick={()=>setIsOpen(!isOpen)}
            width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M18 6L6 18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
            </svg>   
            )
        }
        </button>
    </>
  )
}

export default Hamburger