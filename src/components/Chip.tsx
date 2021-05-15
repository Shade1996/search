import { FormControlLabel, Radio } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { ReactComponent as Tag } from '../assets/Tag.svg'



const  Chip:React.FC<{ tag:string, active?:boolean, onClick?: () => void }> = ({ tag, active, onClick }) => {
    const [tagActive, settagActive] = useState(false)
    const [tagNoActive, settagNoActive ]=  useState(true)
    // console.log(tagActive)
    return (
        <label htmlFor={tag} className="flex justify-center items-center py-1 px-4  bg-gray-100 text-purple-700 space-x-2" style={{ 
            backgroundColor : tagActive && tagNoActive ? "#6833FF":"",
            color : tagActive && tagNoActive ? "#FFFFFF":"",  
            borderRadius : 40
            }}  >
                <Tag />
                <input type="radio" name="search" value={tag} className="visible"  onChange={(e) =>{ 
                    console.log(e.target.attributes)
                    
                    settagActive(true) ;settagNoActive(false)}}   />
                {tag}
        </label>
       
    )
}

export default Chip
