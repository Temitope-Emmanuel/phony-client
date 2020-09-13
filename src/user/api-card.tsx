

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

interface IQuery {
    limit:number;
    page:number
}

const defaultQuery = {
    limit:5,
    page:1
}

export const getUserCard = async (credential:ICredential,query:IQuery=defaultQuery ) => {
    try{
        // const urlQuery = new URL(`${process.env.REACT_APP_SERVER_URL}/api/card/user/${credential.userId}`)
        // urlQuery.searchParams("limit",query.limit)
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/card/user/${credential.userId}?limit=${query.limit}&page=${query.page}`,{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
                Authorization:`Bearer ${credential.token}`
            },
            // body:JSON.stringify(query)
        })
        return await response.json()
    }catch(err){
        console.log(err)
    }
}