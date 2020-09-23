import React from "react"
import {Box} from "@material-ui/core"
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles"


const useStyles = makeStyles(({breakpoints,...theme}:Theme) =>
    createStyles({
        root: {
            boxShadow:"0px 10px 43px 9px rgba(0,0,0,.1)",
            backgroundColor:"rgba(0,0,0,.2)",
            borderRadius:".5em",
            display:"flex",
            flexDirection:"row-reverse",
            alignItems:"center",
            justifyContent:"center",
            position:"relative",
            transition:"all .1s linear",
            height:"65%",
            width:"90%",
            margin:"auto",
            [breakpoints.up("sm")]:{
                height:"15.5em"
            },
            // [breakpoints.up("md")]:{
            //     "&:hover":{
            //         transform:"translateY(-10%) scale(1.05)",
            //         boxShadow:"0px 10px 43px 9px rgba(0,0,0,.7)",
            //         borderRadius:"1em"
            //     }     
            // }
          },
          detailContainer:{
              padding:".5em",
              height:"100%",
              display:"flex",
              flexDirection:"column",
              alignItems:"center",
              justifyContent:"center",
              textAlign:"center",
              flex:1,
              "& h3":{
                  marginBottom:"0 !important",
                  fontSize:"1.7em",
                  opacity:".9",
                  lineHeight:"1.1em",
                  letterSpacing:".1em",
                  fontWeight:"500",
                  WebkitBackgroundClip:"text",
                  WebkitTextFillColor:"transparent",      
                  backgroundImage:`linear-gradient(to right,black,${theme.palette.primary.dark})`,
              },
              "& p":{
                  marginTop:"0 !important",
                  opacity:".8",
                  fontWeight:"300",
                  lineHeight:"1.1em",
                  fontSize:"1.3em",
                  WebkitBackgroundClip:"text",
                  WebkitTextFillColor:"transparent",      
                  backgroundImage:`linear-gradient(to bottom,black,${theme.palette.primary.dark})`,
              },
              [breakpoints.down("xs")]:{
                  margin:".2em .9em",
                  flex:"1",
                  padding:"0 0",
                  "& h3":{
                      fontSize:"1.3em"
                  },
                  "& p":{
                      fontSize:"1em"
                  },
              }
          },
          imageContainer:{
              flex:1.5,
              height:"100%",
            //   transform:"translateX(-15%) !important",
              backgroundPosition:"center",
              backgroundRepeat:"no-repeat",
              backgroundSize:"contain",
              "& img":{
                  maxHeight:"100%",
                  maxWidth:"100%",
                  objectFit:"cover"
              },
              [breakpoints.down("sm")]:{
                  minWidth:"55%"
              }
          }
    })
)

interface IProps { 
    heading:string;
    content:string;
    img:string;
    duration:number;
}

const GetStartedCard:React.FC<IProps> = (props) => {
    const classes = useStyles()

    return(
        <div data-aos="fade-right" data-aos-delay={props.duration} className={classes.root}>
            <div className={classes.detailContainer}>
                <h3>
                    {props.heading}
                </h3>
                <p>
                    {props.content}
                </p>
            </div>
            <div data-aos="fade" data-aos-delay={props.duration*3} style={{
                backgroundImage:`url(${props.img})`
            }} className={classes.imageContainer}>
            </div>
        </div>
    )
}


export default GetStartedCard