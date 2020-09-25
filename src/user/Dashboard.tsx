import React,{ChangeEvent} from "react"
import {Box,TextField,Grow,Divider,ButtonGroup,Button,IconButton} from "@material-ui/core"
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles"
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RatingCalculator from "../other/RatingCalculator"
import {orange,deepOrange} from "@material-ui/core/colors"
import {getCardsDetail} from "./api-card"
import TransactionTable from "./TransactionTable"
import ReferralTable from '../other/Referral'
import {IUser,ICard} from "./UserComponent"
import {retrieveJwt,IToken} from "../auth/auth-helper"
import {DialogContext} from "../config/SnackContext"
import Dialog from "./Dialog"

const useStyles = makeStyles((theme:Theme) => (
    createStyles({
        root:{
            height:"auto",
            padding:theme.spacing(1,0),
            width:"98vw",
            margin:"2em 1vw",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"column"
        },
        walletContainer:{
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"center",
            width:"95%",
            "& > div":{
                borderRadius:".5em",
            },
            [theme.breakpoints.down("sm")]:{
                flexDirection:"column-reverse",
                justifyContent:"center",
                "& > div":{
                    width:"95%",
                    margin:"1.5em 2.5%"
                }
            }
        },
        acctContainer:{
            width:"30%",
            backgroundColor:"whitesmoke",
            margin:theme.spacing(2,0),
            padding:theme.spacing(4,2.5),
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            "& div":{
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                width:"100%"
            },
            "& h3":{
                fontSize:"1.3em",
                fontWeight:"400",
                opacity:".8",
                color:"black"
            },
            "& svg":{
                fontSize:"4em"
            },
            "& span":{
                fontSize:"1.25em"
            },
            [theme.breakpoints.down("sm")]:{
                padding:"10px 15px"
            }
        },
        amountContainer:{
            display:"flex",
            flexDirection:"column",
            width:"100%",
            justifyContent:"space-evenly",
            alignItems:"center",
            "& > div":{
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center"
            }
        },
        btcContainer:{
            width:"60%",
            backgroundColor:"whitesmoke",
            padding:theme.spacing(2,1),
            display:"flex",
            flexDirection:"row",
            justifyContent:"center",
            alignItems:"center",
            textAlign:"center",
            "& h4":{
                fontSize:"1.4em",
                color:"black",
                fontWeight:"500",
                marginBottom:"20px"
            },
            "& > div":{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                margin:theme.spacing(0,1.5),
                height:"100%",
                "& button":{
                    padding:".8em 1em",
                    margin:"1em .5em",
                    "& svg":{
                        fontSize:"2.4em"
                    }
                }
            },
            "& > div:first-child":{
                width:"40%",
                "& h6":{
                    fontSize:"1.2em",
                    margin:"10px",
                    fontWeight:500
                }
            },
            "& > div:nth-child(2)":{
                // width:"60%",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"column",
                width:"50%"
            },
            [theme.breakpoints.down("sm")]:{
                flexDirection:"column-reverse",
                "& > div":{
                    width:"100% !important"
                }
            }
        },
        buttonHolder:{
            // [theme.breakpoints.down("sm")]:{
            //     display:"flex",
            //     flexDirection:"row"
            // }
        },
        priceContainer:{
            [theme.breakpoints.down("sm")]:{
                display:"flex",
                flexDirection:"row"
            }
        },
        transactionContainer:{
            width:"95%",
            padding:"1.5% 2.5%",
            display:"flex",
            justifyContent:"space-evenly",
            flexDirection:"row",
            "& > div:first-child":{
                width:"45",
                [theme.breakpoints.up("md")]:{
                    // marginRight:"3em",
                },
                [theme.breakpoints.down("md")]:{
                    width:"95vw",
                    padding:"1em .5em",
                }
            },
            "& > div:nth-child(2)":{
                width:"40%",
                display:"flex",
                justifyContent:"flex-start",
                alignItems:"center",
                flexDirection:"column",
                [theme.breakpoints.down("md")]:{
                    width:"92vw",
                    padding:"1em .5em"
                }
            },
            [theme.breakpoints.down("md")]:{
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"space-between"
            }
        }
    })
))

interface IProps {
    user:IUser;
}

interface IUserDetail extends IUser {
    pendingTransaction?:number;
    totalTransaction?:number;
    successfulTransaction?:number;
}

interface adapter {
    [key:string]:string | number
}

const getDateString = (date:Date) => {
    let year = date.getFullYear()
    let day = date.getDate().toString().length === 1 ? '0' + date.getDate() : date.getDate()
    let month = date.getMonth().toString().length === 1 ? '0' + (date.getMonth()+1) : date.getMonth() + 1
    let hours = date.getHours().toString().length === 1 ? '0' + date.getHours() : date.getHours()
    let minutes = date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes()
    return `${year}-${month}-${day}T${hours}:${minutes}`

}


const Dashboard:React.FC<IProps> = (props) => {
    const classes = useStyles()
    const [BTC,setBTC] = React.useState({
        buy:400,
        sell:425
    })
    const context = React.useContext(DialogContext)
    const currentDate =  new Date()
    const defaultStartTime = getDateString(currentDate)
    const defaultEndTime = getDateString(new Date(currentDate.setHours(currentDate.getHours()+1)))
    const [open,setOpen] = React.useState(false)
    const [showReferralForm,setShowReferralForm] = React.useState(false)
    const [showBlog,setShowDialogBlog] = React.useState(false)

    const [date,setDate] = React.useState({
        referralStart:defaultStartTime,
        referralEnd:defaultEndTime
    }) 
    const [userDetail,setUserDetail] = React.useState<IUserDetail>()
    const {admin} = props.user
    
    const submitReferral = () => {
        context.handleOpen!({type:"success",message:"A new Referral Timeline has been created"})
    }
    const handleToggle = () => {
        setOpen(!open)
    }
    const handleReferralForm = () => {
        setShowReferralForm(!showReferralForm)
    }
    const handleBlog = () => {
        setShowDialogBlog(!showBlog)
    }
    const handleDate = (e:ChangeEvent<HTMLInputElement>) => {
        setDate({...date,[e.target.name]:e.target.value})
    }
    React.useEffect(() => {
        let totalTransaction:number = 0;
        let pendingTransaction:number = 0;
        let successfulTransaction:number = 0;
        if(props.user.admin){
            const jwt = retrieveJwt()
            const abortController = new AbortController()
            const signal = abortController.signal
            getCardsDetail((jwt as IToken).token,signal).then(data => {
                data.map((card:ICard,idx:number) => {
                    if(card.status === "Pending"){
                        pendingTransaction++
                    }else{
                        successfulTransaction++
                    }    
                })
                totalTransaction = data.length
                setUserDetail({...props.user,
                    pendingTransaction,successfulTransaction
                    ,totalTransaction
                })
            })
        }else{
            props.user!.card?.map((card,idx) => {
                if(card.status === "Pending"){
                    pendingTransaction++
                }else{
                    successfulTransaction++
                }
            })
            totalTransaction = props.user!.card?.length || 0
            setUserDetail({...props.user,
                pendingTransaction,successfulTransaction
                ,totalTransaction:props.user.card?.length
            })
        }
    },[props.user])

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setBTC({...BTC,[e.target.name]:e.target.value})
    }
    return(
        <>
        <Dialog blog={true} open={showBlog} handleToggle={handleBlog} />
        <Box className={classes.root}>
        <Box className={classes.walletContainer}>
            <Box className={classes.acctContainer} style={{
                backgroundColor:orange[200]
            }} >
                    <Box style={{
                        padding:".3em",
                        alignItems:"center",
                        justifyContent:"space-between",
                        backgroundColor:orange[100]
                    }}>
                        <MonetizationOnIcon/>
                        <Box style={{
                            alignItems:"center",
                            flexDirection:"column"
                        }}>
                            {
                                admin ?
                                <h3>Admin Mode</h3> : 
                                <>
                                <h3>REFERRAL CODE</h3>
                                <span>{props.user.referral}</span>
                                </>
                            }
                        </Box>
                    </Box>
                    <Box style={{
                        flexDirection:"column",
                    }}>
                        <h3>{admin ? "TOTAL TRANSACTION" : "TRANSACTION HISTORY"}</h3>
                        <Box className={classes.amountContainer}>    
                        {userDetail && ["pendingTransaction",
                                "successfulTransaction",
                                "totalTransaction"]
                        .map((item,idx) => (
                            <Box>
                                <span>{item.substring(0,item.indexOf("T"))}</span>
                                <span>{((userDetail as unknown as adapter)[item])}</span>
                            </Box>
                        ))}
                        </Box>
                    </Box>
            </Box>
            <Box className={classes.btcContainer} style={{
                backgroundColor:orange[200]
            }} >
                <Box>
                    <h4>
                        BTC RATES TODAY
                    </h4>
                    <Box className={classes.priceContainer}>
                        <h6>BUY AT: {BTC.buy}/$</h6>
                        <h6>SELL AT: {BTC.sell}/$</h6>
                    </Box>
                </Box>
                <Divider orientation="vertical" flexItem/>
                <Box style={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    flexDirection:"column",
                    width:"50%"
                }}>
                    {!admin &&
                        <h4>Welcome to Phonystore. Click below to begin</h4>
                    }
                    {open && 
                    <Grow in={open}>
                        <>
                            <TextField name="buy" label="BUY PRICE"
                             value={BTC.buy} onChange={handleChange}
                            />
                            <TextField name="sell" label="SELL PRICE"
                             value={BTC.sell} onChange={handleChange}
                            />
                        </>
                    </Grow>}
                    <Box className={classes.buttonHolder}>
                        {admin ? 
                            <Button onClick={handleToggle} 
                            style={{backgroundColor:"rgba(0,0,0,.9)",
                            color:deepOrange["A200"]}}>
                                <PlayArrowIcon/>
                                Change BTC rates
                            </Button> :
                            <>
                            <Button style={{backgroundColor:"rgba(0,0,0,.9)",color:deepOrange["A200"]}}>
                                <PlayArrowIcon/>
                                Start Trade
                            </Button>
                            <Button style={{color:"rgba(0,0,0,.9)",backgroundColor:deepOrange["A200"]}}>
                            <PlayArrowIcon/>
                                Buy Airtime
                            </Button>
                            </>
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
        <Box className={classes.transactionContainer}>
            <Box>
                <TransactionTable admin={admin} />
            </Box>
            <Box>
            {!admin ? <RatingCalculator/>:
            <>
            <ReferralTable/>
            <Box style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"column"
            }}>
                <ButtonGroup>
                    <Button onClick={handleReferralForm} style={{marginTop:"1em",
                        backgroundColor:"rgba(0,0,0,.9)",
                        color:deepOrange["A200"]}}>
                        {showReferralForm ? "Close Referral Form" : "Create Referral Session"}
                    </Button>
                    <Button  style={{marginTop:"1em",
                        backgroundColor:"rgba(0,0,0,.9)",
                        color:deepOrange["A200"]}} onClick={handleBlog} >
                        Create New Blog
                    </Button>
                </ButtonGroup>
                <Grow in={showReferralForm} >
                    <Box style={{
                        display:"flex",
                        marginTop:"1em",
                        width:"100%",
                        justifyContent:"center",
                        alignItems:"center",
                        flexDirection:"column"
                    }}>
                        <TextField id="datetime-local"
                        label="Referral Start Time" name="referralStart"
                        type="datetime-local" onChange={handleDate}
                        defaultValue={date.referralStart}
                        />
                        <TextField id="datetime-local-end"
                        label="Referral End Time" name="referralEnd"
                        type="datetime-local" onChange={handleDate}
                        defaultValue={date.referralEnd}/>
                        <Button onClick={submitReferral} style={{color:"rgba(0,0,0,.9)",
                            backgroundColor:deepOrange["A200"],
                            marginTop:"1.5em"
                            }}>
                                Submit
                        </Button>
                    </Box>
                </Grow>
            </Box>
            </>}
            </Box>
        </Box>
    </Box>
    </>
    )
}

export default Dashboard