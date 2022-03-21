import React from 'react'

import WordChange from './WordChange'

const HeaderText = () =>{
  return(
      <div >
        <div className="text-5xl mt-16 mb-4">
          <h1><p className='flex'>An <WordChange words={["Organized", "Improved"]}/> Life
          </p> With Life Pad</h1>
        </div>
          <p className="text-gray-500 leading-4 max-w-lg">Create accessible, user-friendly documnets that support markdown,
          programming languages, and utilize some state-of-the-art Machine 
          Learning.</p>
    </div>
  )
}

const Main = () => {

  return (
    <div className="text-white place-items-center grid xl:block max-w-screen-2xl m-auto px-16">
        <HeaderText/>
        <div className="flex justify-between m-auto  pr-12">
          <div className="hidden xl:block relative w-full h-auto">
            <img src="./assets/personHomePage.svg" alt="image" width="360" className="absolute bottom-0 left-10 z-20"></img>
            <img src="./assets/greenblog.svg" alt="green_blob" width="850" className="absolute -bottom-56 -left-20"></img>
          </div>
          <div className="mt-5 lg:mt-0 relative">
            <img src="./assets/img.svg" width="450" className="top-15 right-14"></img>
          </div>
        </div>
    </div>
  )
}

export default Main