import { proxy } from "valtio"

export const searchKeyWord = proxy({ value:""})

export const result = proxy({ value:[""]})

export const tagActive = proxy({ value:false})

export const searchState = proxy({ value:"" as "Loading"|"Nothing"| "Error"|"Response"|"Timeout"})

