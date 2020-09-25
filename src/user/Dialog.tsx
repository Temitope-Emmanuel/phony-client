import React,{MouseEvent,ChangeEvent} from "react"
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles"
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Dialog,ButtonGroup,Typography,Box,DialogContent,TextField,DialogActions} from '@material-ui/core';
import BurstModeIcon from '@material-ui/icons/BurstMode';
import {DialogContext} from "../config/SnackContext"
import {create} from "./api-card"
import {create as newBlog} from "../blog/api-blog"
import {retrieveJwt} from "../auth/auth-helper"
import {useParams} from "react-router-dom"
import {ICard} from "./UserComponent"
import { blue,red,orange,deepOrange } from '@material-ui/core/colors';
import {storage} from "../firebase"


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
    updateCardList?(arg:ICard):void;
    blog:boolean;
}

interface IState {
    body:string;
    image:File | null,
    imageLink:string,
    title:string
}

interface IParams {
    userId:string
}

const DialogComponent:React.FC<IProps> = ({blog,open,handleToggle,...props}) => {
    const context = React.useContext(DialogContext)
    const classes = useStyles()
    const params:IParams | {} = useParams()
    const[values,setValues] = React.useState<IState>({
        body:"",
        imageLink:"",
        title:"",
        image:null
    })
    
    const handleFilebaseUpload = () => {
        const uploadTask = storage.ref(`/images/${(values.image as File).name}`).put((values.image as File))
        uploadTask.on("state_changed",(snapShot) => {
        },(err) =>  {
            context.handleOpen!({type:"error",message:err.message ||"Something went wrong please try again later"})
        },() => {
            storage.ref("images").child((values.image as File).name).getDownloadURL().then(imageUrl =>
                {
                setValues((curSt) => ({...values,imageLink:imageUrl}))
                let payload;
        const jwt = retrieveJwt()
        if(blog){
            payload = {
                title:values.title,
                body:values.body
            }
        }else{
            payload = new FormData()
            payload.append("image",imageUrl)
        }
        if(blog){
            newBlog(payload,jwt!.token).then(data => {
                setValues({...values,image:null,imageLink:""})
                if(data.message){
                    context.handleOpen!({type:"success",message:"New Blog has been created"})
                }else{
                    context.handleOpen!({type:"error",
                    message:data.error || `Something went wrong with new Transaction Try again later`})
                }
            })
        }else{
            create(payload,{userId:(params as IParams).userId,token:jwt!.token}).then(data => {
                setValues({...values,image:null,imageLink:""})
                console.log(data)
                if(data.message){
                    if(props.updateCardList){
                        props.updateCardList(data.data)
                    }
                    context.handleOpen!({type:"success",message:"New Transaction created Successful"})
                }else{
                    context.handleOpen!({type:"error",
                    message:data.error || `Something went wrong with new Transaction Try again later`})
                }
            })
        }
        handleToggle()
            })
        })
    }

    const handleSubmit = async () => {
        await handleFilebaseUpload();
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
          <DialogTitle id="simple-dialog-title">{blog ? "Create a New Blog Post" : "Create A New Transaction"}</DialogTitle>
          <DialogContent style={{
              display:"flex",
              flexDirection:"column",
              justifyContent:"space-between"
          }}>
              {
                  !blog &&
              <Box style={{
                  display:'flex',
                  flexDirection:"column",
                  alignItems:"center",
                  justifyContent:"center"
              }}>
                  <Typography style={{
                      fontSize:"1.4em"
                  }} variant="subtitle2" >
                      {values.image ? values.image?.name : "Upload Image"}
                  </Typography>
                <input name="image" onChange={handleChange}
                 type="file" accept="image/**" style={{display:"none"}}
                id="Image-input"/>
                <label htmlFor="Image-input">
                    <Button component="span">
                        <BurstModeIcon style={{
                            backgroundColor:deepOrange["A700"],
                            color:"black",
                            borderRadius:"50%",
                            fontSize:"2em",
                            padding:".3em"
                        }} />
                    </Button>
                </label>
              </Box>
              }
              {
                  blog &&
                <>
                <TextField
                    id="outlined-multiline-static"
                    label="Title of Blog Post" name="title"
                    onChange={handleChange}
                    value={values.title}
                    defaultValue="Input Any comment You would like us to know"
                    variant="standard"
                    style={{
                        margin:"1em .5em"
                    }}
                />
              <TextField
                id="outlined-multiline-static"
                label="Comment" name="comment"
                onChange={handleChange} multiline
                value={values.body}
                rows={10}
                defaultValue="Input Any comment You would like us to know"
                variant="outlined"
                style={{
                    margin:"1em .5em"
                }}
            />
                </>
              }
          </DialogContent>
          <DialogActions style={{
              display:"flex",
              justifyContent:"center",
              alignItems:"center"
          }}>
              <ButtonGroup>
                <Button onClick={handleToggle} style={{
                    backgroundColor:"black",
                    color:deepOrange[900],
                    padding:'.5em 1.5em'
                }}>Cancel</Button>
                <Button
                onClick={handleSubmit} 
                style={{
                    backgroundColor:deepOrange[900],
                    color:"black",
                    padding:'.5em 1em'
                }}>Submit</Button>
              </ButtonGroup>
          </DialogActions>
        </Dialog>
    )
}

export default DialogComponent