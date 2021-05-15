import axios from 'axios'
import React, { useEffect } from 'react'

const SearchIteam:React.FC<{ title?:string, img?:string, description?:string, onClick?:() => void }> = ({ title, img, description, onClick }) => {
    return (
        <div className="w-full h-24 rounded-xl py-3 pl-3 pr-5 flex items-center space-x-4" onClick={onClick}>
            <img src={img} className="rounded-xl" width={76} height={76}/>
            <div className="flex flex-col">
                <div className="font-semibold text-xl ">
                    {title}
                </div>
                <div className="opacity-60">
                    {description}
                </div>
            </div>
        </div>
    )
}

export default SearchIteam
