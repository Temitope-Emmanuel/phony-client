import React from "react"
import {makeStyles,Theme,createStyles} from "@material-ui/core/styles"
import {Box} from "@material-ui/core"
import "./Bubble.css"
import {Avatar,Collapse,IconButton,Typography} from "@material-ui/core"
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import {red} from "@material-ui/core/colors"



const useStyles = makeStyles((theme:Theme) => (
    createStyles({
        root:{
            display:"flex",
            flexDirection:"row",
            alignItems:"flex-end",
            margin:theme.spacing(2,0),
            width:"100%",
            "& button":{
                padding:"0 0"
            },
            "& svg":{
                transition:"transform .5s linear",
                margin:theme.spacing(.5)
            }
        },
        large: {
            width: theme.spacing(4),
            height: theme.spacing(4),
          },
          commentContainer:{
              display:"flex",
              alignItems:"center",
              flexDirection:"row"
          },
        dateContainer:{
            display:"block",
            fontSize:".9em",
            opacity:".6",
            alignSelf:"flex-end",
            margin:theme.spacing(0,1)
        },
        actionContainer:{
            display:"flex",
            flexDirection:"column",
            justifyContent:"flex-start",
            width:"3em",
            height:"9em"
        }
    })
))
export interface IComment {
    _id:string;
    body:string;
    author:{
        admin:string;
        _id:string
    };
    createdAt:Date;
}
interface IProps {
    comment:IComment;
    deleteComment(arg:string):void
}

const Comment:React.FC<IProps> = ({comment:{body,createdAt,_id,author:{admin,...author}},deleteComment,...props}) => {
    const classes =  useStyles()
    const [deleteSlide,setDeleteSlide] = React.useState(false)

    const handleSlide = () =>{
        setDeleteSlide(!deleteSlide)
    }
    const handleDelete = () => {
        deleteComment(_id)
    }
    return(
        <Box style={{
        flexDirection:admin ? "row-reverse" : "row"
    }}
         className={classes.root}>
            <Avatar className={classes.large} 
            alt={author._id} 
            // src={user.profileImage}
            />

            <Box className={classes.commentContainer}>
                <Box onClick={handleSlide} style={{marginLeft:".4em",zIndex:3}}
                 className="bubble">
                    <Typography style={{fontSize:".8em"}} component="span" variant="body1">
                        {body}
                    </Typography>
                    <Typography component="span" variant="subtitle2" 
                        className={classes.dateContainer}>
                    {(new Date(createdAt)).toLocaleTimeString()}  
                    </Typography>
                </Box>
            {/* {props.creator === user.username &&  */}
            {/* <Collapse
            timeout={600}
            style={{transform:"rotate(90deg)"}}
            collapsedHeight={40}
                in={deleteSlide}>
                    <Box className={classes.actionContainer}>
                        <IconButton onClick={handleSlide}>
                            <ArrowBackIosRoundedIcon 
                             style={{transform:!deleteSlide ? "rotate(90deg)": "rotate(630deg)",zIndex:105}} />
                        </IconButton>
                        <IconButton onClick={handleDelete}>
                           <HighlightOffRoundedIcon 
                            style={{backgroundColor:red[300],color:red[800],transform:!deleteSlide ? "rotate(90deg)": "rotate(630deg)"}} />
                        </IconButton>
                    </Box>
                </Collapse> */}
            </Box>
        </Box>
    )
}


export default Comment