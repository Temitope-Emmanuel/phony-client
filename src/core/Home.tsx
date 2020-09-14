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
            // position:"relative"
          },
          ImageContainer:{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"center",
            "& img":{
              maxWidth:"50%",
              maxHeight:"60vh"
            },
            [theme.breakpoints.down("sm")]:{
              flexDirection:"column",
              "& img":{
                maxHeight:"100%",
                maxWidth:"100%"
              }
            }
          }
    })
)

const Home = () => {
    const classes = useStyles()
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