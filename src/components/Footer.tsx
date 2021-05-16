import React from 'react'
import { useSnapshot } from 'valtio'
import { result, searchState } from '../state'

function Footer() {
    useSnapshot(result)
    useSnapshot(searchState)
    return (
        <div className="h-full flex items-center ml-6 text-gray-400 font-medium text-xl">
            {searchState.value === "Response" && result.value.length + " results" }
            {searchState.value === "Loading" && "Searching ..." }
            {searchState.value === "Nothing" && "No result"}
            {searchState.value === "Error" && <div style={{color:"#ED2E7E"}}> Something wrong happened but this is not your fault :)</div>}
            {searchState.value === "Timeout" && <div style={{color:"#ED2E7E"}}> The Request timeout</div>}
        </div>
    )
}

export default Footer
