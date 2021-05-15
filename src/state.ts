import { proxy, subscribe } from "valtio"

export const searchKeyWord = proxy({ value:""})

export const result = proxy({ value:[""]})

export const indexData = proxy({ title: "", description:"", image:"", url:"" , category:""})

export const tagActive = proxy({ value:false})


