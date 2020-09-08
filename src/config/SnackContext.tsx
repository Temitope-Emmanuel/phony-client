import React from "react"
import Snackbar from "../other/Snackbar"

export interface IPayload {
    type:string;
    message:string
}

export interface IDialog {
    payload:IPayload;
    open:boolean;
    handleOpen?(arg:IPayload) :void
}


export const DialogContext = React.createContext<IDialog>({
    payload:{
        type:"",
        message:""
    },
    open:false
})


const SnackProvider = <P extends object>(Component: React.ComponentType<P>) => {
    return function Provider({...props}){
        const [alert,setAlert] = React.useState<IPayload>({
            type:"",
            message:""
        })
        const [openSnackbar,setOpenSnackbar] = React.useState(false)    
        const handleSnackbar = (payload:IPayload):void => {
            setOpenSnackbar(true)
            setAlert(payload)
            setTimeout(() => {
              setOpenSnackbar(false)
            },4000)
        }
        return(
            <DialogContext.Provider value={{
                payload:alert,open:openSnackbar,
                handleOpen:handleSnackbar}} >
                    <Snackbar handleOpen={handleSnackbar} open={openSnackbar} payload={alert} />
                    <Component {...props as P} />
            </DialogContext.Provider>
        )
    }
}

export default SnackProvider