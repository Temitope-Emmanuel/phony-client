

export const create = async (body:any,token:string) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/blog/new`,{
            method:'POST',
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify(body)
        })
        return await response.json()
    }catch(err){
        console.log(err)
    }
}

export const getAllBlog = async (signal:any) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/blog/all`,{
            method:'GET',
            headers:{
                "Accept":"application/json"
            },
            signal:signal
        })
        return await response.json()
    }catch(err){
        console.log(err)
    }
}