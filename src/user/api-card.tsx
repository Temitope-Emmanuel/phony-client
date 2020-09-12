

interface ICredential {
    userId:string;
    token:string;
}

export const create = async (body:any,credential:ICredential) => {
    try{
        const response = await fetch(`http://localhost:3001/api/card/user/${credential.userId}`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                Authorization:`Bearer ${credential.token}`
            },
            body
        })
        return await response.json()
    }catch(err){
        console.log(err)
    }
}