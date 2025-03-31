import { useEffect, useRef, useState } from "react"

export const useOverflowScreenBottom =() => {
    const ref = useRef<HTMLDivElement>(null)
    const [overflow, setOverflow] = useState(false)
  

    useEffect(() => {
        if (ref.current) {
            const {bottom} = ref.current.getBoundingClientRect()
            const { innerHeight } = window
            const isOverflow = bottom > innerHeight
            setOverflow(isOverflow)
        }
     
    }
    ,[])


    return {
        overflow,
        ref,
    }
}