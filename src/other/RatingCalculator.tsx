import React from 'react'
import {Box,Grow,Button,Theme,Badge,FormControl,InputLabel,InputBase, createStyles} from "@material-ui/core"
import {makeStyles,withStyles} from "@material-ui/styles"
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Select from "../user/Select"
import {useState} from 'react'
import {deepOrange,orange} from "@material-ui/core/colors"


const BootstrapInput = withStyles((theme:Theme) => (
    createStyles({
        root: {
            'label + &': {
              marginTop: theme.spacing(3),
            },
            width:"100%"
          },
          input: {
            width:"100%",
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #ced4da',
            fontSize: 16,
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            '&:focus': {
              borderRadius: 4,
              borderColor: orange["A200"],
              boxShadow: `0 0 0 0.2rem ${deepOrange["A200"]}`,
              backgroundColor:"whitesmoke"
            }
          }
    })
))(InputBase)


const StyledBadge = withStyles((theme:Theme) =>(
    createStyles({
        badge: {
            right: 13,
            top: 1,
            border: `2px solid ${deepOrange[100]}`,
            padding: '8px',
            borderRadius:"50%",
            backgroundColor:deepOrange[500]
          }
    })
))(Badge)

const useStyles = makeStyles((theme:Theme) => (
    createStyles({
        root:{
            width:"100%",
            backgroundColor:orange[200],
            borderRadius:".4em",
            padding:theme.spacing(1,1.5),
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"column",
            marginTop:"2em",  
            "& h3":{
                fontSize:"2em",
                margin:".4em 0",
                fontWeight:"400",
                color:deepOrange["A700"]
            },
            "& p":{
                fontSize:"1.3em",
                color:deepOrange["A700"]
            }
        },
        buttonContainer:{
            width:"100%",
            display:"flex",
            "& button":{
                margin:theme.spacing(0,.8),
                padding:theme.spacing(1,10,1,.8),
                border:`${deepOrange["A700"]} 2px solid`,
                textTransform:"capitalize",
                fontSize:"1.2em",
                "& svg":{
                    marginRight:"0 .5em",
                    fontSize:"2.5em",
                    color:"rgba(0,0,0,.7)"
                },
                [theme.breakpoints.up("md")]:{
                    margin:theme.spacing(0,1.5),
                },
            },
            [theme.breakpoints.down("md")]:{
                justifyContent:"center"
            }
        },
        formContainer:{
            "& > *":{
                padding:"0 .3em"
            },
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center"
        },
        margin:{
            width:"90%",
            margin:".5em 0"
        }
    })
))


const RatingCalculator = () => {
    const classes = useStyles()
    const [active,isActive] = useState(false)
    const handleChange = () => {
        isActive(!active)
    }

    return(
        <Box className={classes.root}>
            <h3>Rate Calculator</h3>
            <p>Get the current value for your transaction</p>
            <Box>
                <Box className={classes.buttonContainer}>
                    {!active ?
                    <Grow in={!active} >
                        <Button onClick={handleChange} style={{color:"rgba(0,0,0,.9)",backgroundColor:deepOrange["A200"]}}>
                        <PlayCircleOutlineIcon/>
                            Sell
                        </Button> 
                    </Grow> 
                    :
                    <Grow in={active} >
                        <StyledBadge color="primary" variant="dot">
                            <Button onClick={handleChange} style={{color:"rgba(0,0,0,.9)",backgroundColor:deepOrange["A200"]}}>
                                <PlayCircleOutlineIcon/>
                                Sell
                            </Button>
                        </StyledBadge>
                    </Grow>
                    }
                    {active ?
                    <Grow in={active} >
                        <Button onClick={handleChange} style={{backgroundColor:"rgba(0,0,0,.9)",color:deepOrange["A200"]}}>
                        <PlayCircleOutlineIcon style={{color:deepOrange["A200"]}}/>
                            Buy
                        </Button> 
                    </Grow> 
                    :
                    <Grow in={!active} >
                        <StyledBadge color="primary" variant="dot">
                            <Button onClick={handleChange} style={{backgroundColor:"rgba(0,0,0,.9)",color:deepOrange["A200"]}}>
                                <PlayCircleOutlineIcon style={{color:deepOrange["A200"]}}/>
                                Buy
                            </Button>
                        </StyledBadge>
                    </Grow>
                    }
                </Box>
                <Box className={classes.formContainer}>
                    <Select category={false} heading={"Card Name"}/>
                    <Select category={true} heading={"Card Price Tag"} />
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor="textbox">Amount</InputLabel>
                        <BootstrapInput id="textbox" />
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}

export default RatingCalculator