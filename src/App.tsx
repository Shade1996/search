import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import Chip from './components/Chip'
import SearchBox from './components/SearchBox'
import SearchIteam from './components/SearchIteam'
import { indexData, result, searchKeyWord, searchState } from './state'
import LoaderSrc from './assets/Loader.png'
import NothingSrc from './assets/Location Search.png'
import ErrorSrc from './assets/Error.png'
import Cursor from './components/Cursor'
const Loading = ()=> {
	useSnapshot(searchState)
	return (
		<div className="h-full w-full flex justify-center items-center">
			{searchState.value === "Loading" && <img src={LoaderSrc} alt="Loading state" className="animate-spin"/>}
			{searchState.value === "Nothing" &&	<img src={NothingSrc} alt="no result state"/>}
			{searchState.value === "Error" && <img src={ErrorSrc} alt="error state" />}
		</div>
	)
}


export default function App() {
	useSnapshot(indexData)
	useSnapshot(searchKeyWord)
	useSnapshot(result)
	useSnapshot(searchState)
	const [activeIndex, setActiveIndex] = useState(4);
	const [filter, setfilter] = useState(true)
	const [searchWord, setsearchWord] = useState("")
	useEffect(()=>{
		const getData = () => {
			let getError = true
			axios.get("https://frontend-test-api.digitalcreative.cn/?no-throttling="+ getError + "&search=" + searchKeyWord.value).then(responese =>{
			result.value  = responese.data

			if (activeIndex === 0) {
				const DataFilter = result.value.filter((p:any) => p.category === "Languages & Frameworks")
				result.value = DataFilter
				setsearchWord("Languages")
			}else if (activeIndex === 1) {
				const DataFilter = result.value.filter((p:any) => p.category === "Design")
				result.value = DataFilter
				setsearchWord("Design")
			}else if (activeIndex === 2) {
				const DataFilter = result.value.filter((p:any) => p.category === "Build, Test, Deploy")
				result.value = DataFilter
				setsearchWord("Build")
			}else if (activeIndex === 3) {
				const DataFilter = result.value.filter((p:any) => p.category === "Cloud Hosting")
				result.value = DataFilter
				setsearchWord("Cloud")
			}else {
				setfilter(false)
			}

			
			searchState.value =  "Loading"
			
			console.log(searchState.value)

			console.log(result.value)
		})
			
			setTimeout(() => {
				
				if (result.value.length === 0 ) {
					searchState.value = "Nothing"
				} else if(result.value[0] !== ""){
					searchState.value ="Response"
				}
				if (getError === false) {
					searchState.value = "Error"
				}
				console.log(searchState.value)
			}, 2000);
		}
		getData()
	},[searchKeyWord.value, activeIndex])

	
	return (
		<div className="h-screen w-screen " style={{ backgroundColor : "#EDF2F7"}}>
			<div className="absolute box">
				<div className="box-part1 flex flex-col items-center space-y-4">
					<SearchBox />
					<div className="flex space-x-4 w-full">
							<Chip tag="Language" active={activeIndex === 0} onClick={()=> {
								setActiveIndex(0)
								searchKeyWord.value = "Language"
								}} />
							<Chip tag="Design" active={activeIndex === 1} onClick={()=> {
								setActiveIndex(1)
								searchKeyWord.value = "Design"
								}}/>
							<Chip tag="Build" active={activeIndex === 2}  onClick={()=> {
								setActiveIndex(2)
								searchKeyWord.value = "Build"
								}}/>
							<Chip tag="Cloud" active={activeIndex === 3} onClick={()=> {
								setActiveIndex(3)
								searchKeyWord.value = "Cloud"
								}}/>
					</div>
					<div className={`h-full w-full  ${result.value.length > 4 ? "overflow-y-scroll" :""}`}>
						{searchState.value === "Response" ? 
						result.value.map((p:any,i)=>(
							<SearchIteam title={p.title} img={p.image} description={p.description} key={i} onClick={() => window.open(p.url)} />
						)):<Loading />} 
					</div>
					
				</div>
				<div className="box-part2 border-t">
					<div className="h-full flex items-center ml-6 text-gray-400 font-medium text-xl">
					{searchState.value === "Response" && result.value.length + " results" }
					{searchState.value === "Loading" && "Searching ..." }
					{searchState.value === "Nothing" && "No result"}
					{searchState.value === "Error" && <div style={{color:"#ED2E7E"}}> Something wrong happened but this is not your fault :)</div>}
					</div>
				</div>
			</div>
			<Cursor />
		</div>
	)
}
