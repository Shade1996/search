import React, { useEffect, useState } from 'react'

const useEvent = (eventName: any, cb: (e: MouseEvent) => void) => {
    useEffect(() => {
        document.addEventListener(eventName, cb)
        return () => {
            document.removeEventListener(eventName, cb)
        }
    }, [])
}

export default function Cursor() {
    const [position, setPosition] = useState({x: 0, y: 0})
    const [hidden, setHidden] = useState(false)
    const [clicked, setClicked] = useState(false);

    useEvent("mousemove", (e: MouseEvent)=>setPosition({x: e.clientX, y: e.clientY}))
    useEvent("mouseenter", ()=>setHidden(false))
    useEvent("mouseleave", ()=>setHidden(true))
    useEvent("mouseup", ()=>setClicked(false))
    useEvent("mousedown", ()=>setClicked(true))
    
    
    return (
        <>
            <div className={`${hidden 
            ? "opacity-0" 
            :"cursor w-20 h-20 border-2 backdrop-filter backdrop-blur-sm  fixed transform -translate-x-1/2 -translate-y-1/2  pointer-events-none z-50 rounded-full transition-all ease-linear active:bg-white scale-90"}`}
            style={{
                left:`${position.x}px`,
                top:`${position.y}px`,
                backgroundColor:`${clicked?"":"#151515"}`
            }}/>
        </>
    )
}
