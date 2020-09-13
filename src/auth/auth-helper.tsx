
export interface IToken {
    token:string;
    user:{
        username:string;
        email:string;
        admin:boolean;
        _id:string
    }
}

export default (token:IToken) => {
    const jwt = window.localStorage.getItem("jwtToken")
    if(jwt == null){
        window.localStorage.removeItem("jwtToken")
    }
    window.localStorage.setItem("jwtToken",JSON.stringify(token))
}


export const retrieveJwt = ():IToken | null => {
    let result = null
    if(typeof window.localStorage.getItem("jwtToken") !== null){
        result = JSON.parse((window.localStorage.getItem("jwtToken") as string))
    }
    return result
}
