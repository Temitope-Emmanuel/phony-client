import React from "react"
import {useParams} from "react-router-dom"
import {Box,Divider,Button,IconButton} from "@material-ui/core"
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles"
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SimpleTable from "./UserTable"
import RatingCalculator from "../other/RatingCalculator"
import {orange,deepOrange,amber} from "@material-ui/core/colors"
import {read} from "./api-user"
import {retrieveJwt} from "../auth/auth-helper"
import {IDialog} from "../config/SnackContext"
import CardList from "./CardList"
import {IUser} from "./UserComponent"


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
                width:"60%"
            }
        },
        transactionContainer:{
            width:"95%",
            padding:"1.5% 2.5%",
            display:"flex",
            justifyContent:"space-evenly",
            flexDirection:"row",
            [theme.breakpoints.down("md")]:{
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"space-between",
                "& > div":{
                    width:"98% !important",
                    margin:" 1.5em 1%"
                }
            }
        }
    })
))

interface IParams {
    userId:string
}
interface IProps {
    user:IUser
}

interface IUserDetail extends IUser {
    pendingTransaction?:number;
    totalTransaction?:number;
    successfulTransaction?:number;
}

interface adapter {
    [key:string]:string | number
}

const Dashboard = (props:IProps) => {
    const classes = useStyles()
    const params:IParams = useParams()
    const jwt = retrieveJwt()
    const [userDetail,setUserDetail] = React.useState<IUserDetail>()
    const [message,setMessage] = React.useState({
        type:"success",
        text:""
    })
    React.useEffect(() => {
        let totalTransaction:number = 0;
        let pendingTransaction:number = 0;
        let successfulTransaction:number = 0;

        props.user!.card?.map((card,idx) => {
            if(card.status === "Pending"){
                pendingTransaction++
            }else{
                successfulTransaction++
            }
        })
        setUserDetail({...props.user,
            pendingTransaction,successfulTransaction
            ,totalTransaction:props.user.card?.length
        })
    },[props.user])
return(
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
                            {/* <h3>WALLET BALANCE</h3>
                            <span>0.00NGN</span> */}
                            <h3>REFERRAL CODE</h3>
                            <span>{props.user.referral}</span>
                        </Box>
                    </Box>
                    <Box style={{
                        flexDirection:"column",
                    }}>
                        {/* <h3>EARNING HISTORY</h3> */}
                        <h3>TRANSACTION HISTORY</h3>
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
                    <Box>
                        <h6>BUY AT: 440/$</h6>
                        <h6>SELL AT:405/$</h6>
                    </Box>
                </Box>
                <Divider orientation="vertical" flexItem/>
                <Box>
                    <h4>Welcome to Phonystore. Click below to begin</h4>
                    <Box>
                        <Button style={{backgroundColor:"rgba(0,0,0,.9)",color:deepOrange["A200"]}}>
                            <PlayArrowIcon/>
                            Start Trade
                        </Button>
                        <Button style={{color:"rgba(0,0,0,.9)",backgroundColor:deepOrange["A200"]}}>
                            <PlayArrowIcon/>
                            Buy Airtime
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
        <Box className={classes.transactionContainer}>
            <Box style={{width:"45"}}>
                {userDetail?.card &&
                <SimpleTable card={userDetail!.card}/>
                }
            </Box>
            <Box style={{width:"40%"}}>
            <RatingCalculator/>
            </Box>
        </Box>
        
    </Box>
    )
}

export default Dashboard