
interface ICredential {
    transactionId?:string;
    commentId?:string;
    token:string;
}

export const createComment = async (credential:ICredential,body:any) => {
    try{
        console.log(credential.transactionId)
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/comment/${credential.transactionId}/new`,{
            method:'POST',
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
                Authorization:`Bearer ${credential.token}`
            },
            body:JSON.stringify(body)
        })
        return await response.json()
    }catch(err){
        console.log(err)
    }
}

export const deleteComment = async (credential:ICredential) => {
    try{
        const response = await fetch(`${process.env.SERVER_URL}/api/comment/${credential.commentId}`,{
            method:"DELETE",
            headers:{
                Accept:"application/json",
                Authorization:`Bearer ${credential.token}`
            }
        })
        return await response.json()
    }catch(err){
        console.log(err)
    }
}
