import React from "react"
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles"
import {Box} from "@material-ui/core"
import MainView from "./MainView"
import Atlas from "./Atlas"
import GetStarted from "./GetStarted"
import Services from "./Services"
import {Img2,Img3} from "../assets/images/clusterImg"
import Footer from "./Footer"
import Navbar from "./Navbar"

const useStyles = makeStyles((theme:Theme) => 
    createStyles({
        root:{
            overflowX:"hidden",
          },
          ImageContainer:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            "& img:first-child":{
              maxWidth:"45%",
            },
            "& img:nth-child(2)":{
              maxWidth:"100%"
            },
            [theme.breakpoints.up("sm")]:{
              flexDirection:"row",
              justifyContent:"space-around",
              "& > *":{
                maxWidth:"45% !important"
              }
            }
          }
    })
)

const Home = () => {
    const classes = useStyles()

    React.useEffect(() => {
      const callServer = () => {
        fetch(`${process.env.SERVER_URL}/api/getreadt`,{
          method:"GET",
          headers:{
            "Accept":"application/json"
          }
        }).then(data => data.json())
        .then(data => console.log(data))
        .catch(err => console.log(err)) 
      }
      callServer()
    },[])
    
    return(
        <Box className={classes.root}>
          <Navbar/>
          <MainView/>
          <Atlas/>
          <GetStarted/>
          <Box className={classes.ImageContainer}>
            <img data-aos="flip-right" src={Img2} />
            <img data-aos="flip-left" src={Img3} />
          </Box>
          <Services/>
          <Footer/>
        </Box>
    )
}

export default Home