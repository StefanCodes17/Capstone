import React, { useEffect, useState } from 'react'

const WordChange = ({words}) => {

    const [currentindex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(()=>{
            setCurrentIndex((currentindex + 1) % words.length)
        }, 2000)
        return () => clearInterval(interval);
      }, [currentindex]);

  return (
    <span className='mx-3'>
        {words[currentindex]}
    </span>
  )
}

export default WordChange