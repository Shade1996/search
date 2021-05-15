import { RadioGroup } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import Chip from './components/Chip'
import SearchBox from './components/SearchBox'
import SearchIteam from './components/SearchIteam'
import { indexData, result, searchKeyWord } from './state'


export default function App() {
	useSnapshot(indexData)
	useSnapshot(searchKeyWord)
	useSnapshot(result)
	const [tagActive, settagActive] = useState(false)

	useEffect(()=>{
		const getData = async () => {
			try {
				let { data } = await axios.get("https://frontend-test-api.digitalcreative.cn/?no-throttling=true&search=" + searchKeyWord.value)
				
				result.value = data
				
				
				// console.log(result.value)
			} catch (error) {
				// console.log(Error)
			}
		}
		getData()
	},[searchKeyWord.value])
	return (
		<div className="h-screen w-screen" style={{ backgroundColor : "#EDF2F7"}}>
			<div className="absolute box">
				<div className="box-part1 flex flex-col items-center space-y-4">
					<SearchBox />
					<form className="flex space-x-4 w-full">
						<fieldset className="flex-row space-x-4 flex" >
							<Chip tag="Language" />
							<Chip tag="Design" />
							<Chip tag="Build" />
							<Chip tag="Cloud" />
						</fieldset>
					</form>
					<div className="h-full w-full overflow-y-scroll">
						{result.value.map((p:any,i)=>(
							<SearchIteam title={p.title} img={p.image} description={p.description} key={i} onClick={() => window.open(p.url)} />
						))} 
					</div>
					
				</div>
				<div className="box-part2">
					
				</div>
			</div>
		</div>
	)
}
