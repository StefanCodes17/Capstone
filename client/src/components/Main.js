import React from 'react'

const Main = () => {
  return (
    <div>
        <div  className="ml-10 ">
            <h1 className="text-white text-5xl leading-6 mt-16 mb-4 max-w-sm">An Organzied Life With a Life Pad</h1>
            <p className="text-gray-500 leading-4 max-w-lg">Create accessible, user-friendly documnets that support markdown,
programming languages, and utilize some state-of-the-art Machine 
Learning.</p>
        </div>
        <img src="./assets/personHomePage.svg" alt="image" width="360" className="absolute bottom-5 left-10 z-10"></img>
        <img src="./assets/greenblog.svg" alt="green_blob" width="850" className="absolute -bottom-24"></img>
        <img src="./assets/img.svg" className="absolute top-15 right-14"></img>
    </div>
  )
}

export default Main