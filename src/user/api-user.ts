interface IRead {
    signal:AbortSignal;
    userId:undefined | number | string
}

export const read = async (params:IRead,credential:string) => {
    try{
        const response = await fetch(`http://localhost:3001/api/user/${params.userId}`,{
            method:'GET',
            headers:{
                "Accept":"application/json",
                Authorization:`Bearer ${credential}`
            },
            signal:params.signal
        })
        return await response.json()
    }catch(err){
        console.log(err)
    }
}