import React from "react"
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles"
import {Box,Typography} from "@material-ui/core"
import {getAllBlog} from "../blog/api-blog"
import {DialogContext} from "../config/SnackContext"
import {deepOrange} from "@material-ui/core/colors"

const useStyles = makeStyles((theme:Theme) => (
    createStyles({
        root:{
            marginTop:"1.5em",
            paddingTop:"3em",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"column",
            width:"100vw",

        },
        blogContainer:{
            width:"95%",
            borderRadius:".3em",
            margin:"1em .5em",
            // display:"flex",
            // alignItems:"center",
            // flexWrap:"wrap"
            display:"grid",
            gridTemplateColumns:"repeat( auto-fit, minmax(23em, 1fr))",
            gridTemplateRows:"fit-content(12em)",
            gridGap:".5em"
        },
        bodyContainer:{
            backgroundColor:"rgba(0,0,0,0.1)",
            margin:'.5em',
            padding:".5em 1em",
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between",
            borderRadius:".3em",
            "& > div:first-child":{
                display:"flex",
                justifyContent:"flex-start",
                alignItems:"center",
                flexDirection:"column",
                width:"75%",
                " & span":{
                    alignSelf:"flex-start"
                }
            },
        },
        imageContainer:{
            width:"25%",
            borderRadius:".3em",
            height:"6em",
            backgroundColor:deepOrange[500]
        }
    })
))

interface IBlog {
    title:string;
    body:string;
    createdAt:string;
}


const BlogPage = () => {
    const classes = useStyles()
    const [blogs,setBlogs] = React.useState<IBlog[]>()
    const context = React.useContext(DialogContext)

    React.useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        getAllBlog(signal).then(data => {
            if(data){
                if(data.message.indexOf("success") > -1){
                    setBlogs(data.data)
                    context.handleOpen!({type:"info",message:"List of Post and Blog from Phonytunes "})
                }else{
                    context.handleOpen!({type:"error",message:data.error || "Something went wrong"})
                }
            }else{
                context.handleOpen!({type:"info",message:"Unable to load blog please try again"})
            }
        })
    },[])

    return(
        <Box className={classes.root}>
            <Typography variant="h4">
                PHONYTUNES BLOG
            </Typography>
            <Box className={classes.blogContainer}>
                {blogs && blogs.map((blog,idx) =>(
                    <Box key={idx} className={classes.bodyContainer} >
                        <Box>
                            <Typography variant="h5">
                                {blog.title}
                            </Typography>
                            <Typography variant="body1" >
                                {blog.body.substring(0,150)}...
                            </Typography>
                        <Typography style={{alignSelf:'"flex-start'}} variant="caption" >{new Date(blog.createdAt).toLocaleString()}</Typography>
                        </Box>
                        <Box className={classes.imageContainer}></Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}



export default BlogPage