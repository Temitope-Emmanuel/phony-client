import React,{MouseEvent,ChangeEvent} from "react"
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles"
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Dialog,Typography,Box,DialogContent,TextField,DialogActions} from '@material-ui/core';
import { blue,red } from '@material-ui/core/colors';
import BurstModeIcon from '@material-ui/icons/BurstMode';
import {DialogContext} from "../config/SnackContext"
import {create} from "./api-card"
import {retrieveJwt} from "../auth/auth-helper"
import {useParams} from "react-router-dom"
import {ICard} from "./UserComponent"


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
    updateCardList(arg:ICard):void
}



interface IState {
    comment:string;
    image?:File,
    imageLink:string
}

interface IParams {
    userId:string
}

const DialogComponent:React.SFC<IProps> = ({open,updateCardList,handleToggle,...props}) => {
    const context = React.useContext(DialogContext)
    const classes = useStyles()
    const params:IParams | {} = useParams()
    const[values,setValues] = React.useState<IState>({
        comment:"",
        imageLink:"http://placeimg.com/640/480"
    })

    const handleSubmit = async () => {
        const newCard = new FormData()
        const jwt = retrieveJwt()
        newCard.append("comment",values.comment)        
        newCard.append("image",values.imageLink)
            create(newCard,{userId:(params as IParams).userId,token:jwt!.token}).then(data => {
                console.log("this is the data",data)
                if(data.message){
                    updateCardList(data.data)
                    context.handleOpen!({type:"success",message:"New Transaction created Successful"})
                }else{
                    context.handleOpen!({type:"error",
                    message:data.error || `Something went wrong with new Transaction Try again later`})
                }
            })
            handleToggle()
    }

    const handleChange = (evt:ChangeEvent<HTMLInputElement>) => {
        const value = evt.target.name === 'image'
          ? evt.target.files![0] : evt.target.value
        // setValues({...values,  [evt.target.name]: value })
        setValues({...values,[evt.target.name]:value})
    }
    return(
        <Dialog onClose={handleToggle}  maxWidth={"sm"} fullWidth={true}
            aria-labelledby="simple-dialog-title"
            open={open}>
          <DialogTitle id="simple-dialog-title">Create A New Transaction</DialogTitle>
          <DialogContent style={{
              display:"flex",
              flexDirection:"column",
              justifyContent:"space-between"
          }}>
              <Box style={{
                  display:'flex',
                  flexDirection:"column",
                  alignItems:"center",
                  justifyContent:"center"
              }}>
                  <Typography variant="caption" >
                      {values.image ? values.image?.name : "Upload Image"}
                  </Typography>

                <input name="image" onChange={handleChange} type="file" accept="image/**" style={{display:"none"}}
                id="Image-input"/>
                <label htmlFor="Image-input">
                    <Button component="span">
                        <BurstModeIcon/>
                    </Button>
                </label>
              </Box>
              <TextField
                id="outlined-multiline-static"
                label="Comment" name="comment"
                multiline onChange={handleChange}
                value={values.comment}
                rows={10}
                defaultValue="Input Any comment You would like us to know"
                variant="outlined"
                style={{
                    margin:"1em .5em"
                }}
            />
          </DialogContent>
          <DialogActions>
              <Button onClick={handleToggle} style={{
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