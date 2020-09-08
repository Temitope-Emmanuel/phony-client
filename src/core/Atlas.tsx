import React, { Dispatch, SetStateAction } from "react"
import {useEffect,useState} from 'react'
import {Box} from "@material-ui/core"
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles"
import {deepPurple,deepOrange} from '@material-ui/core/colors'
import {AtlasBg,Person1,Person2,Person3,Person4,Person5} from "../assets/images/world"


const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        root:{
            position:"relative",
            backgroundImage:`url(${AtlasBg})`,
            height:"50vh",
            width:"100vw",
            backgroundPosition:"center",
            backgroundSize:"contain",
            backgroundRepeat:"no-repeat",
            "& img":{
              position:"absolute",
              filter:"grayscale(60%)",
              transition:"all .25s linear",
              [theme.breakpoints.down("sm")]:{
                height:"4em !important"
              },
              "&:hover":{
                filter:"grayscale(0)",
                transform:"scale(1.15) !important"
              }
            }
          },
          container:{
            textAlign:"center",
            "& h2":{
              fontSize:"1.9em",
              fontWeight:"400",
              letterSpacing:".15em",
              WebkitBackgroundClip:"text",
              WebkitTextFillColor:"transparent",      
              backgroundImage:`linear-gradient(to right,${deepOrange[500]},${deepOrange[900]})`,
            },
            "& p":{
              fontSize:"1.3em",
              opacity:".83",
              WebkitBackgroundClip:"text",
              WebkitTextFillColor:"transparent",      
              backgroundImage:`linear-gradient(to bottom,${deepPurple[500]},${deepPurple[900]})`,
            }
          },
          ratesContainer:{
            width:"100%",
            height:"5vh",
            backgroundColor:"black",
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-evenly",
            color:"whitesmoke",
            "& p":{
              margin:theme.spacing(0,1.2),
              fontSize:"1em"
            }
          }
    })
)

type bpi = {
    code:string;
    rate:string
}

type rate = {
    NGN:bpi;
    USD:bpi;
}

let initialState:rate = {
    NGN:{
        code:"NGN",
        rate:"270"
    },
    USD:{
        code:"USD",
        rate:"100"
    }
}

const Atlas = () => {
    const classes = useStyles()
    const [rates,setRates] = useState(initialState)

    useEffect(() => {
        // const apiCall = async function(){
        //     const response = await fetch(`https://api.coindesk.com/v1/${"bpi"}/currentprice/NGN.json`,{
        //         method:"GET",
        //         headers:{
        //             Accept:"application/json"
        //         }
        //     })
        //     console.log(response)
        //     if(response.status === 200){
        //         setRates(response.body.data.bpi)
        //     }
        // }
        // apiCall()
    },[])

    return(
        <>
            <Box style={{
                position:"sticky",
                top:0
            }} className={classes.ratesContainer}>
                {rates.NGN &&
                <>
                    <p>{rates.NGN.code} - {rates.NGN.rate}</p>
                    <p>{rates.USD.code} - {rates.USD.rate}</p>
                </>
            }
            </Box>
        
            <Box className={classes.container}>
                <h2>24/7 WE GOT YOU</h2>
                <p>Always here to do business with you</p>
            </Box>
            <Box className={classes.root}>
            <img style={{left:"30%",top:"15%",height:"5em"}} src={Person1}/>
            <img style={{left:"43%",top:"45%",height:"6em"}} src={Person2}/>
            <img style={{left:"60%",top:"65%",height:"6.5em"}} src={Person3}/>
            <img style={{left:"60%",top:"45%",height:"3em"}} src={Person4}/>
            <img style={{left:"55%",top:"10%",height:"7em"}} src={Person5}/>
            </Box>
        </>
    )
}

export default Atlas