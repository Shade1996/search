import React from 'react'
import { ReactComponent as Tag } from '../assets/Tag.svg'

const  Chip:React.FC<{ tag:string, active?:boolean, onClick?: () => void }> = ({ tag, active, onClick }) => {
    return (
        <div className="flex justify-center items-center py-1 px-4  bg-gray-100 text-purple-700 space-x-2" style={{ 
            backgroundColor : active ? "#6833FF":"",
            color : active  ? "#FFFFFF":"",  
            borderRadius : 40
            }} onClick={onClick} >
                <Tag />
                {tag}
        </div>
       
    )
}

export default Chip
