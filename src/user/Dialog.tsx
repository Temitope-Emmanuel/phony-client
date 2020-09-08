import React from "react"
import PropTypes from "prop-types"
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles"
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Dialog,Box,DialogContent,TextField,DialogActions} from '@material-ui/core';
import { blue,red } from '@material-ui/core/colors';
import BurstModeIcon from '@material-ui/icons/BurstMode';
import {DialogContext} from "../config/SnackContext"


const useStyles = makeStyles((theme:Theme) => (
    createStyles({
        root:{},
        fileContainer:{
            width:"100%",
            display:"flex",
            flexDirection:"column",
            alignitems:"center",
            justifyContent:"center",
        }
    })
))

type MessageType = { 
    type:string;
    text:string
}

interface IProps {
    open:boolean;
    handleToggle : () => void;
}

const DialogComponent:React.SFC<IProps> = ({open,handleToggle,...props}) => {
    const [file,setFile] = React.useState(null)
    const [name,setName] = React.useState("")
    const context = React.useContext(DialogContext)
    const handleDrop = async (file: React.SetStateAction<null>[]) => {
        setFile(file[0])
    }
    const classes = useStyles()
    const handleSubmit = async () => {
        const payload = {name,file}

        const formData = new FormData()
        // formData.append('file',(file as string))
        formData.append('upload_preset',"YHPHONY_V1")

        const response = await fetch("https://api.cloudinary.com/v1_1/yhamagee/image/upload",{
            method:'POST',
            headers:{
                "Accept":"application/json"
            },
            body:formData
        })
        const result = await response.json()
        handleToggle()
        result.status === 200 ? 
        context.handleOpen!({
            type:"success",
            message:"New Request successfully created"
        }):
        context.handleOpen!({
            type:"info",
            message:"Unable to create new Request"
        })
    }

    return(
        <Dialog onClose={handleToggle} aria-labelledby="simple-dialog-title" open={open}>
          <DialogTitle id="simple-dialog-title">Create A New Request</DialogTitle>
          <DialogContent style={{
              display:"flex",
              flexDirection:"column",
              justifyContent:"space-between"
          }}>
              <input type="file" accept="image/**" style={{display:"hidden"}} id="Image-input"/>
              <Button component="span" >
                  <BurstModeIcon/>
              </Button>
              <TextField
                id="outlined-multiline-static"
                label="Comment"
                multiline
                rows={4}
                defaultValue="Input Any comment You would like us to know"
                variant="outlined"
                style={{
                    margin:"1em .5em"
                }}
            />
          </DialogContent>
          <DialogActions>
              <Button style={{
                  backgroundColor:red[100],
                  color:red[900],
                  padding:'.5em 1.5em'
              }}>Cancel</Button>
              <Button
              onClick={handleSubmit} 
              style={{
                  backgroundColor:blue[100],
                  color:blue[900],
                  padding:'.5em 1em'
              }}>Submit</Button>
          </DialogActions>
        </Dialog>
    )
}

export default DialogComponent