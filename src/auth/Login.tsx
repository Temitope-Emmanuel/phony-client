import React from "react"
import {Link,RouteComponentProps} from "react-router-dom"
import {makeStyles,Theme,createStyles} from "@material-ui/core/styles"
import {Box,IconButton,Button,TextField,Typography,InputAdornment} from "@material-ui/core"
import {mainBg} from "../assets/images/main"
import {create,login} from "./api-auth"
import useInputState from "../config/useInputState"
import {SnackConsumer} from "../other/Snackbar"
import {IDialog} from "../config/SnackContext"
import {orange} from "@material-ui/core/colors"
import UserIcon from '@material-ui/icons/SupervisedUserCircle';
import PasswordShowIcon from '@material-ui/icons/VisibilityOff';
import TicketIcon from '@material-ui/icons/ConfirmationNumber';
import PasswordIcon from '@material-ui/icons/Visibility';
import EmailIcon from '@material-ui/icons/Email';
import saveJwt from "./auth-helper"

const useStyles = makeStyles((theme:Theme) => (
    createStyles({
        root:{
            width:"98%",
            height:"98vh",
            display:"flex",
            alignItems:"center",
            borderRadius:"5em",
            padding:"1vh 1%",
            "& > div:first-child":{
                backgroundColor:"whitesmoke",
                width:"40vw",
                height:"100%",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"column",
                [theme.breakpoints.down("md")]:{
                    width:"100%",
                    backgroundImage:`url(${mainBg})`,
                    filter:"grayscale(.9)"
                }
            },
            "& > div:nth-child(2)":{
                backgroundImage:`url(${mainBg})`,
                width:"60vw",
                height:"100%",
                filter:"grayscale(.5)",
                [theme.breakpoints.down("md")]:{
                    display:"none"
                }
            },
            "& a":{
                textDecoration:"none",
                color:"black"
            }
        },
        formContainer:{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"column",
            width:"90%",
            "& > *":{
                width:"100%",
                margin:"1em 0"
            },
            "& > button":{
                padding:".6em 3em",
                marginTop:".5em",
                fontSize:"1em",
                width:"auto"
            }
        }
    })
))

interface ILogin extends RouteComponentProps {
    context:IDialog
}

const Login = ({context,history,...props}:ILogin) => {
    const isLogin = props.location.pathname === "/login"
    const classes = useStyles()
    const [username,setUsername,resetUsername] = useInputState("John@doe.com")
    const [email,setEmail,resetEmail] = useInputState("")
    const [password,setPassword,resetPassword] = useInputState("")
    const [referral,setReferral,resetReferral] = useInputState("")
    const [state,setState] = React.useState({
        submitting:false,
        isValid:false,
        showPassword:true
    })

    const resetInput = () => {
        resetUsername()
        resetEmail()
        resetPassword()
        resetReferral()
    }

    const isValid = () => {
        return [email,password,username].every((val) => (
            val.length >= 5
        ))
    }
    const handleToggle = () => {
        setState({...state,showPassword:!state.showPassword})
    }

    React.useEffect(() => {
        const canSubmit = isValid()
        setState({...state,isValid:canSubmit})
    },[username,email,password])

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        setState({...state,submitting:true})
        const payload = {
            email:email.toLowerCase(),
            password,
            ...(!isLogin && {username}),
            ...(referral && {referral})
        }
        const apiCall = isLogin ? login(payload) : create(payload)
        apiCall.then(data => {
            console.log(data)
            setState({...state,submitting:false})
            if(data){
                if(data.error){
                    context.handleOpen!({message:data.error,type:"error"})
                }else{
                    saveJwt({user:data.data,token:data.token})
                    history.push(`/user/${data.data._id}`)
                    resetInput()
                }
            }else{
                context.handleOpen!({message:"Something is wrong",type:"info"})
            }
        })
    }

    return(
        <Box className={classes.root}>
            <Box>
                <Typography variant="h3">
                    {isLogin ? "Login" : "Register"}
                </Typography>
                <form className={classes.formContainer} >
                    {!isLogin &&
                    <>
                    <TextField
                    label='Add Username'
                    InputProps={{
                        endAdornment:(
                            <InputAdornment position="end" >
                                <UserIcon/>
                            </InputAdornment>
                        )
                    }}
                        value={username}
                        onChange={setUsername}
                    />
                    <TextField
                    label='Input Referral Code'
                    helperText="This input is not necessary"
                    value={referral}
                    onChange={setReferral}
                    InputProps={{
                        endAdornment:(
                            <InputAdornment position="end" >
                                <TicketIcon/>
                            </InputAdornment>
                        )
                    }}
                    />
                    </>
                    }
                    <TextField
                    label='Add Email'
                    InputProps={{
                        endAdornment:(
                            <InputAdornment position="end" >
                                <EmailIcon/>
                            </InputAdornment>
                        )
                    }}
                        value={email}
                        onChange={setEmail}
                    />
                    <TextField
                    label='Create new password'
                    type={state.showPassword ? "password" : "text"}
                    InputProps={{
                        endAdornment:(
                            <InputAdornment onClick={handleToggle}  position="end" >
                                <IconButton>
                                    {state.showPassword ? <PasswordIcon/> : <PasswordShowIcon/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                        value={password}
                        onChange={setPassword}
                    />
                    <Button type="submit" onClick={handleSubmit} style={{
                        backgroundColor:orange["A700"],
                        color:"black"}} disabled={!state.isValid || state.submitting}
                     >{!state.isValid ? "Please Fill All input" : state.submitting ? "Login in user": "Submit"}
                    </Button>
                </form>
                    <Typography component="span" variant="body2" >
                        forgotten your password ? click <Link to="/login" >here</Link>
                    </Typography> 
                { isLogin ?
                    <Typography component="span" variant="body2" >
                        Don't have an account ? Register <Link to="/register" >here</Link>
                    </Typography> : 
                    <Typography component="span" variant="body2" >
                        Already have an accoun login <Link to="/login" >here</Link>
                    </Typography>
                }
            </Box>
            <Box>

            </Box>
        </Box>
    )
}


export default SnackConsumer(Login)