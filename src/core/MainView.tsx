import React from "react"
import {Box} from "@material-ui/core"
import {Link} from "react-router-dom"
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles"
import Typed from "react-typed"
import {Button,ButtonGroup} from "@material-ui/core"
import {mainBg,backgroundImg1,backgroundImg2,backgroundImg3} from "../assets/images/main"
import { deepOrange } from "@material-ui/core/colors"
import {retrieveJwt} from "../auth/auth-helper"


const useStyles = makeStyles((theme:Theme) => 
    createStyles({
        root:{
            height:"60vh",
            width:"100%",
            paddingLeft:"1.5em",
            paddingTop:"12.5em",
            backgroundAttachment:"fixed",
            backgroundImage:`url(${mainBg}),url(${backgroundImg1}),url(${backgroundImg3}),url(${backgroundImg2})`,
            backgroundSize:"cover,contain,contain,contain",
            backgroundRepeat:"no-repeat,repeat,no-repeat,repeat",
            backgroundPosition:"right,center,bottom,center",
            backgroundBlendMode:"hard-light,multiply",
            display:"flex",
            justifyContent:"center",
            alignItems:"start",
            flexDirection:"column",
            "& h1":{
                fontSize:"2.5em",
                WebkitBackgroundClip:"text",
                WebkitTextFillColor:"transparent",      
                backgroundImage:`linear-gradient(to right,black,${theme.palette.primary.dark})`,
                letterSpacing:".2em",
                fontWeight:"400",
                textTransform:"uppercase",
                [theme.breakpoints.down("sm")]:{
                    fontSize:"1.4em"
                }
            },
            "& h2":{
                textTransform:"capitalize",
                WebkitBackgroundClip:"text",
                WebkitTextFillColor:"transparent",      
                backgroundImage:`linear-gradient(to right,black,${theme.palette.primary.dark})`,
                [theme.breakpoints.down("sm")]:{
                    fontSize:"1.3em"
                }
            },
            "& button":{
                height:"auto",
                fontSize:"1.3em",
                "& a":{
                    textDecoration:"none",
                    color:"inherit",
                    margin:" 0 .9em"
                },
                [theme.breakpoints.down("sm")]:{
                    width:"auto",
                    fontSize:"1.1em",
                    "& a":{
                        margin:"0 0"
                    }
                }    
            }
        }
    })
)


const MainView = () => {
    const classes = useStyles()
    const jwt = retrieveJwt()

    return(
        <Box className={classes.root}>
            <h2>Do you want to&nbsp;
                <Typed
                strings={[
                    "trade Gift Card ?","buy bitcoin ?","transact cryptocurrency ?"
                ]}
                typeSpeed={40}
                backSpeed={70}
                loop
                />
            </h2>
                <h1>Welcome to PHONYTUNES</h1>
                <ButtonGroup data-aos="fade-in" data-delay="2000">
                <Button style={{backgroundColor:"rgba(0,0,0,1)",color:deepOrange[900]}}>    
                    {jwt ?
                    <Link to={`/user/${jwt.user._id}`} >
                        Profile
                    </Link>:
                    <Link to="/register">
                        SIGN UP 
                    </Link>}
                </Button>
                <Button style={{color:"rgba(0,0,0,1)",backgroundColor:deepOrange[900]}}>
                    <a href="https://wa.me/2348096045108">
                    TRADE NOW
                    </a>
                </Button>
                </ButtonGroup>
        </Box>
    )
}


export default MainView