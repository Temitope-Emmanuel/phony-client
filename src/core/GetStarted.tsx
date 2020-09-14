import React from "react"
import {Box,} from "@material-ui/core"
import {makeStyles,Theme,createStyles} from "@material-ui/core/styles"
import GetStartedCard from "./GetStartedCard"
import {Img1,Img2,Img3,Img4,Img5} from "../assets/images/getStarted"

const useStyles = makeStyles((theme:Theme) => 
    createStyles({
        root:{
            display:"flex",
            justifyContent:"center",
            flexDirection:"column",
            alignItems:"center",
            width:"100%",
          },
          bodyContainer:{
            width:"95%",
            margin:"1em auto",
            position:"relative",
            display:"grid",
            gridGap:"3em",
            gridTemplateColumns:"repeat(auto-fit,minmax(25em,auto))",
            justifyContent:"center",
            gridAutoRows:"17.5em"
          }
    })
)
interface imageProps {
    img:string,
    heading:string,
    content:string
}
interface IProps {
    imageProps?:imageProps[]
}

const GetStarted:React.SFC<IProps> = (props) => {
    const classes = useStyles()

    return(
        <Box className={classes.root}>
      <Box className={classes.bodyContainer}>
        {props.imageProps!.map((m,idx) => (
          <GetStartedCard duration={idx*100} {...m} key={idx} />
        ))}
      </Box>
    </Box>       
    )
}

GetStarted.defaultProps = {
    imageProps:[
    {
      img:Img1,
      heading:"Business Ready",
      content:"With our 24/7 ready assistance we are always ready to do business with you."
    },
    {
      img:Img2,
      heading:"Wide Services",
      content:"Whether is redeeming of gift card or trading of cryptocurreny we are well capable of serving your needs."
    },
    {
      img:Img3,
      heading:"Top Notch Security",
      content:"We have top notch business security to safe-guard against fraud and mistakes in information, your buisness is always safe with us."
    },
    {
      img:Img5,
      heading:"Payment, Transaction, Ease",
      content:"We are well funded and are able to deliver payment as soon as buisness is concluded."
    },
    {
      img:Img4,
      heading:"Real Client, Real Business",
      content:"Our customer services is top notch and will help you along the way"
    },
  ]}
  
  export default GetStarted