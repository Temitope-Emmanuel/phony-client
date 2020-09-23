import React from "react"
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles"
import {Box} from "@material-ui/core"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        root:{
            backgroundColor:"white",
            boxShadow:"0 7px 30px 3px black",
            transition:"all .5s linear",
            cursor:"pointer",
            borderRadius:"5em 0 5em 0",
            height:"10em",
            width:"18em",
            margin:"0 auto",
            [theme.breakpoints.up("sm")]:{
              "&:hover":{
                transform:"translateY(-15%)",
                height:"115%",
              }
            }
          },
          moreContainer:{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"row",
            height:"100%",
            width:"100%",
            "& div":{
              display:"flex",
              margin:"0 auto",
              justifyContent:"center",
              flexDirection:"column",
              padding:"auto 0",
              alignItems:"center",
              "& h4":{
                fontSize:"2em",
                margin:".2em 0",
              },
              "& p":{
                margin:"0 0"
              } 
            },
            "& svg":{
              transition:"all .3s linear"
            },
            [theme.breakpoints.up("sm")]:{
              "&:hover":{
                "& svg":{
                  color:"blue",
                  transform:"scale(1.5) rotate(180deg)"
                }
              }
            }
          }
    })
)

interface IProps {
    buy:boolean;
    heading?:string;
    isTrue?:boolean;
    duration:number
}

const ServicesCard:React.FC<IProps> = ({buy,...props}) => {
// const ServicesCard:React.SFC<IProps> = ({props}) => {

    const classes = useStyles()

    return(
        <Box data-aos="fade-right" data-aos-delay={props.duration} className={classes.root}>
        <Box className={classes.moreContainer}>
            <Box>
                <h4>
                    {props.heading}
                </h4>
                <p>{props.isTrue ? "Contact Us" : buy ? "Buy and Sell" : "Sell"}</p>
            </Box>
            <ArrowBackIcon/>
        </Box>
        </Box>
      )
}

export default ServicesCard