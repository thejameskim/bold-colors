import React, { useEffect, useState, useRef, MutableRefObject } from 'react';

/**
 * https://stackoverflow.com/questions/43817118/how-to-get-the-width-of-a-react-element
 * @param myRef 
 */
export const useResize = (myRef: MutableRefObject<any>) => {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
  
    useEffect(() => {
      const handleResize = () => {
        setWidth(myRef.current.offsetWidth)
        setHeight(myRef.current.offsetHeight)
      }
  
      window.addEventListener('resize', handleResize)
  
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [myRef])
  
    return { width, height }
}