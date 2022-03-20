import React, { useEffect, useState } from 'react'

const WordChange = ({words}) => {

    const [currentindex, setCurrentIndex] = useState(0)
    useEffect(() => {
        const interval = setInterval(()=>{
            setCurrentIndex((currentindex + 1) % words.length)
        }, 3000)
        return () => clearInterval(interval);
      }, [currentindex]);

  return (
    <>
        {words[currentindex]}
    </>
  )
}

export default WordChange