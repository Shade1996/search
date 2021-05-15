import { FormControlLabel, Radio } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { ReactComponent as Tag } from '../assets/Tag.svg'



const  Chip:React.FC<{ tag:string, active?:boolean, onClick?: () => void }> = ({ tag, active, onClick }) => {
    const [tagActive, settagActive] = useState(false)
    // console.log(tagActive)
    return (
        <label htmlFor={tag} className="flex justify-center items-center py-1 px-4  bg-gray-100 text-purple-700 space-x-2" style={{ 
            backgroundColor : tagActive ? "#6833FF":"",
            color : tagActive ? "#FFFFFF":"",  
            borderRadius : 40
            }}  >
                <Tag />
                <input type="radio" name="search" value={tag} onChange={(e) =>{ 
                    console.log(e.target.checked)
                    e.target.checked ?settagActive(true) :settagActive(false)}}  />
                {tag}
        </label>
       
    )
}

export default Chip
