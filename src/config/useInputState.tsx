import {useState} from "react"

// type defaultReturn = {
//     [(e:any)=> {},()=>{},()=>{} ]
// }

export default (initialState:any) => {
    const [state,setState] = useState(initialState)
    const changeState = (e:any) => {setState(e.target.value)}
    const resetState = () => {setState(initialState)}
    

    return [state,changeState,resetState]
}