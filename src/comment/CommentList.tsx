import React from "react"
import {makeStyles,Theme,createStyles} from "@material-ui/core/styles"
import {Box,Slide,Collapse} from "@material-ui/core"
import Comment,{IComment} from "./Comment"
import {Button,IconButton,Input,FormControl,InputAdornment} from "@material-ui/core"
import UseInputState from "../config/useInputState"
import QuestionAnswerRoundedIcon from '@material-ui/icons/QuestionAnswerRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import {retrieveJwt,IToken} from "../auth/auth-helper"
import CancelScheduleSendIcon from '@material-ui/icons/CancelScheduleSend';
import {createComment,deleteComment} from "./api-comment"
import {DialogContext} from "../config/SnackContext"
import { deepOrange} from "@material-ui/core/colors"


const useStyles = makeStyles((theme:Theme) => (
    createStyles({
        root:{
            width:"100%",
            position:"relative",
            maxHeight:"35em",
            display:"flex",
            "& svg":{
                color:"rgba(0,0,0,.9)",
                borderRadius:"50%",
                width:theme.spacing(3),
                height:theme.spacing(3),
                padding:theme.spacing(1),
                cursor:"pointer"
            }
        },
        commentContainer:{
            overflowY:"auto",
            maxHeight:"30em",
            minHeight:"10em",
            width:"100%",
            marginBottom:theme.spacing(7)
        },
        SlideContainer:{
            width:"100%",
            position:"absolute",
            borderRadius:"5.4em",
            bottom:".1em",
            display:"flex",
            flexDirection:"row",
            justifyContent:"center",
            alignItems:"center",
            backgroundColor:"transparent",
            overflowX:"hidden"
        },
        inputContainer:{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"row",
            padding:theme.spacing(0,2)
        }
    })
))

interface IProps {
    comments:IComment[];
    transactionId:string;
}

const CommentList:React.SFC<IProps> = ({comments,...props}) => {
    const classes = useStyles()
    const [isVisible,setIsVisible] = React.useState(false)
    const [text,handleText,resetText] = UseInputState("")
    const [jwt,setJwt] = React.useState<IToken>()
    const [showComment,setShowComment] = React.useState(false)
    const context = React.useContext(DialogContext)
    const handleVisible = () => {
        setIsVisible(!isVisible)
    }

    React.useEffect(() => {
        const auth = retrieveJwt()
        if(auth !== null){
            setJwt(auth)
        }
    },[])
    const handleToggle = () => {
        setIsVisible(!isVisible)
    }
    const changeComment = () => {
        setShowComment(!showComment)
    }

    const handleSubmit = (e:any) => {
        createComment({transactionId:props.transactionId,token:jwt!.token},{body:text})
        .then(data => {
            handleToggle()
            if(data.message){
                context.handleOpen!({type:"success",message:"New Comment created Successfully"})
            }
        })
        .catch(err => {context.handleOpen!({type:"error",message:err.error || err.message || "Unable to save Comment"})})
    }
    const deleteAComment = (arg:string) => {
        deleteComment({token:jwt!.token,commentId:arg}).then(data => {
            if(data.message){
                context.handleOpen!({type:"success",message:"Comment successfully deleted"})
            }
        })
        .catch(err => {context.handleOpen!({type:"error",message:err.error || err.message || "Unable to save Comment"})})
    }
    
    return(
        <>
            <Button onClick={changeComment} variant="outlined" style={{
                color:deepOrange["A200"],
                marginTop:"3px"
            }} >{showComment ? "Hide Comments" : "Show Comments"}</Button>
        <Collapse in={showComment}>
        <Box className={classes.root}>
            <Box className={classes.SlideContainer}>
                <Slide direction="right" 
                 unmountOnExit mountOnEnter
                 timeout={800} in={isVisible}>
                <FormControl  style={{margin:".4em"}} className={classes.inputContainer}>
                     <Input name="comment"
                    required={true}
                      onChange={handleText}
                      onKeyPress={(e) => e.which === 13 && handleSubmit(e)}
                      value={text}
                      autoFocus={true}
                      placeholder="Input Comment"
                      style={{padding:".3em"}}
                      startAdornment={
                          <InputAdornment position="start">
                              <CancelScheduleSendIcon 
                               style={{transform:"rotate(180deg)"}} 
                               onClick={handleVisible} />
                          </InputAdornment>
                      }
                      endAdornment={
                          <InputAdornment variant="filled" position="end">
                              <Button style={{borderRadius:"5em"}} onClick={handleToggle}>
                                <SendRoundedIcon style={{color:"rgba(255,255,255,0.8)"}} />
                              </Button>
                          </InputAdornment>
                      }
                      />
                </FormControl>
                </Slide>
                <Slide direction="left"
                 unmountOnExit timeout={1200}
                 mountOnEnter in={!isVisible}>
                    <IconButton style={{fontSize:"50"}} 
                     onClick={handleVisible}>
                        <QuestionAnswerRoundedIcon 
                        style={{backgroundColor:"rgba(255,255,255,.7)"}} />
                    </IconButton>
                </Slide>
            </Box>
            <Box className={classes.commentContainer}>
            {comments.map(m => (
                <Box key={m._id}>
                    <Comment comment={m} deleteComment={deleteAComment} />
                </Box>
            ))}
            </Box>
        </Box>
        </Collapse>
        </>
    )
}


export default CommentList