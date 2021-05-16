import React from 'react'
import { useSnapshot } from 'valtio'
import { ReactComponent as  SearchIcon } from '../assets/Search.svg'
import { searchKeyWord } from '../state'

const SearchBox:React.FC<{outline?:boolean}> = ({outline})=> {
    useSnapshot(searchKeyWord)
    return (
        <div className={`flex items-center p-6 w-full h-20 focus-within:ring-2 ${outline ? "ring-pink-400":"ring-purple-700"} rounded-xl`}>
            <SearchIcon  className="w-8 h-8 stroke-2"/>
            <input className="w-full h-full ml-4 focus:outline-none text-xl" type="text" placeholder="Search technologies we use at DC..." value={searchKeyWord.value} onChange={(e)=> searchKeyWord.value = e.target.value} />
        </div>
    )
}

export default SearchBox