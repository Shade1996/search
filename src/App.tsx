import axios from 'axios'
import React, { RefObject, useEffect, useRef, useState } from 'react'
import { useSnapshot } from 'valtio'
import Chip from './components/Chip'
import SearchBox from './components/SearchBox'
import SearchIteam from './components/SearchIteam'
import { result, searchKeyWord, searchState } from './state'
import Cursor from './components/Cursor'
import Loading from './components/Loading'
import { useSpring, animated, config } from 'react-spring'
import Footer from './components/Footer'

//scroll animation
function Scrolling() {
	const [flip, set] = useState(false)
  
	const { scroll } = useSpring({
	  scroll: (result.value.length - 1) * 50,
	  from: { scroll: 0 },
	  reverse: flip,
	  delay: 200,
	  config: config.molasses,
	  onRest: () => set(!flip),
	})
  
	return (
	  <animated.div
		style={{
		  position: 'relative',
		  width: '100%',
		  height: '100%',
		  overflow: 'hidden',
		}}
		scrollTop={scroll}>
		{searchState.value === "Response" ? 
			result.value.map((p:any,i)=>(
				<SearchIteam title={p.title} img={p.image} description={p.description} key={i} onClick={() => window.open(p.url)} />
			)):<Loading />} 
	</animated.div>
	)
  }
export default function App() {
	useSnapshot(searchKeyWord)
	useSnapshot(result)
	useSnapshot(searchState)
	const [activeIndex, setActiveIndex] = useState(4);
	const  wrapperRef = useRef(null)

	useOutsideAlerter(wrapperRef)

	function useOutsideAlerter(ref:RefObject<HTMLDivElement>) {
		useEffect(() => {
			
			function handleClickOutside(event:any) {
				if (ref.current && !ref.current.contains(event.target)) {
					setActiveIndex(4)
					searchKeyWord.value = ""
				}
			}
	
			// Bind the event listener
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
			// Unbind the event listener on clean up
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	}
	
	useEffect(()=>{
		const getData = () => {
			//error state
			let getError = true
			//timeout state = 20
			const time = 4000
			axios.get("https://frontend-test-api.digitalcreative.cn/?no-throttling="+ getError + "&search=" + searchKeyWord.value, { timeout: time }).then(responese =>{
			result.value = responese.data
			searchState.value =  "Loading"
			
			if (activeIndex === 0) {
				const DataFilter = result.value.filter((p:any) => p.category === "Languages & Frameworks")
				result.value = DataFilter
			}else if (activeIndex === 1) {
				const DataFilter = result.value.filter((p:any) => p.category === "Design")
				result.value = DataFilter
			}else if (activeIndex === 2) {
				const DataFilter = result.value.filter((p:any) => p.category === "Build, Test, Deploy")
				result.value = DataFilter
			}else if (activeIndex === 3) {
				const DataFilter = result.value.filter((p:any) => p.category === "Cloud Hosting")
				result.value = DataFilter
			}
			setTimeout(() => {
				if (result.value.length === 0 ) {
					searchState.value = "Nothing"
				} else if(result.value[0] !== ""){
					searchState.value ="Response"
				}
				if (getError === false) {
					searchState.value = "Error"
				}
			}, 2000);

		}).catch(error => {
			searchState.value = "Error"
			if (error.code === "ECONNABORTED" ) {
				searchState.value = "Timeout"
			}
			console.log(error.code)
		})
		}
		getData()
	},[searchKeyWord.value, activeIndex])

	
	return (
		<div className="h-screen w-screen" style={{ backgroundColor : "#EDF2F7"}} >
			<div className="absolute box" ref={wrapperRef}>
				<div className="box-part1 flex flex-col items-center space-y-4">
					<SearchBox outline={searchState.value === "Error" || searchState.value === "Timeout"}/>
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
					<div className={`h-full w-full  ${result.value.length > 4 ? "overflow-y-hidden" :""}`}>
						<Scrolling />
					</div>
				</div>
				<div className="box-part2 border-t">
					<Footer />
				</div>
			</div>
			<Cursor />
		</div>
	)
}