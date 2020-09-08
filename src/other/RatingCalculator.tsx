import React from 'react'
import {Box,Button,Theme,Badge,FormControl,InputLabel,InputBase, createStyles} from "@material-ui/core"
import {makeStyles,withStyles} from "@material-ui/styles"
import {blue} from "@material-ui/core/colors"
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
// import SelectComponent from "../userComponent/selectComponent"
import {useState} from 'react'


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
              borderColor: '#80bdff',
              boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
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
            border: `2px solid whitesmoke`,
            padding: '8px',
            borderRadius:"50%",
            backgroundColor:blue[500]
          }
    })
))(Badge)

const useStyles = makeStyles((theme:Theme) => (
    createStyles({
        root:{
            width:"100%",
            backgroundColor:"white",
            borderRadius:".4em",
            padding:theme.spacing(1,1.5),
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"column",  
            "& h3":{
                fontSize:"2em",
                margin:".4em 0",
                fontWeight:"400"
            },
            "& p":{
                fontSize:"1.3em"
            }
        },
        buttonContainer:{
            width:"100%",
            display:"flex",
            "& button":{
                margin:theme.spacing(0,1.5),
                padding:theme.spacing(1,10,1,.8),
                border:`${blue[500]} 2px solid`,
                textTransform:"capitalize",
                fontSize:"1.2em",
                "& svg":{
                    marginRight:"0 .5em",
                    fontSize:"2.5em",
                    color:"rgba(0,0,0,.7)"
                }
            },
            [theme.breakpoints.down("md")]:{
                justifyContent:"center"
            }
        },
        formContainer:{},
        margin:{}
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
                    <Button onClick={handleChange} style={{backgroundColor:blue[100]}}>
                       <PlayCircleOutlineIcon/>
                        Sell
                    </Button> 
                    :
                    <StyledBadge color="primary" variant="dot">
                    <Button onClick={handleChange} style={{backgroundColor:blue[100]}}>
                        <PlayCircleOutlineIcon/>
                         Sell
                    </Button>
                    </StyledBadge>
                    }
                    {active ? 
                    <Button onClick={handleChange} style={{backgroundColor:blue[100]}}>
                       <PlayCircleOutlineIcon/>
                        Buy
                    </Button> 
                    :
                    <StyledBadge color="primary" variant="dot">
                    <Button onClick={handleChange} style={{backgroundColor:blue[100]}}>
                        <PlayCircleOutlineIcon/>
                         Buy
                    </Button>
                    </StyledBadge>
                    }
                </Box>
                <Box className={classes.formContainer}>
                    {/* <SelectComponent heading={"Gift Card Category"}/>
                    <SelectComponent category={true} heading={"Gift Card Subcategory"} /> */}
                    <FormControl style={{width:"100%",margin:".5em 0"}} className={classes.margin}>
                        <InputLabel htmlFor="textbox">Amount</InputLabel>
                        <BootstrapInput id="textbox" />
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}

export default RatingCalculator