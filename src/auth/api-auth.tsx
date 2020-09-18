interface IBody {
    email:string;
    password:string;
    username?:string;
}


export const create = async (body:IBody) => {
    try{
        const result = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/create`,{
            method:'POST',
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(body)
        })

        return await result.json()
    }catch(err){
        console.log(err)
    }
}

export const login = async (body:IBody) => {
    try{
        const result = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/signin`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json"
            },
            body:JSON.stringify(body)
        })
        return await result.json()
    }catch(err){
        console.log(err)
    }
}