interface IRead {
    signal:AbortSignal;
    userId:undefined | number | string
}

export const read = async (params:IRead,credential:string) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/${params.userId}`,{
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

export const getTopReferrals = async (signal:any) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/referral`,{
            method:"GET",
            headers:{
                Accept:"application/json"
            },
            signal
        })
        return await response.json()
    }catch(err){
        console.log(err)
    }
}