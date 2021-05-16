import React from 'react'
import { useSnapshot } from 'valtio'
import { searchState } from '../state'
import LoaderSrc from '../assets/Loader.png'
import NothingSrc from '../assets/Location Search.png'
import ErrorSrc from '../assets/Error.png'

function Loading() {
    useSnapshot(searchState)
    return (
        <div className="h-full w-full flex justify-center items-center">
			{searchState.value === "Loading" && <img src={LoaderSrc} alt="Loading state" className="animate-spin"/>}
			{searchState.value === "Nothing" &&	<img src={NothingSrc} alt="no result state"/>}
			{searchState.value === "Error" || searchState.value === "Timeout" && <img src={ErrorSrc} alt="error state" />}
		</div>
    )
}

export default Loading
