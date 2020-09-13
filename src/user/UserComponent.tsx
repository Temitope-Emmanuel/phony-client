import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme,Theme,createStyles } from '@material-ui/core/styles';
import {read } from "./api-user"
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import PaymentIcon from '@material-ui/icons/Payment';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import Dashboard from "./Dashboard"
import {RouteComponentProps} from "react-router-dom"
import TransactionTable from './TransactionTable'
import {DialogContext as SnackbarContext} from "../config/SnackContext"
import Footer from "../other/Footer"
import {retrieveJwt} from "../auth/auth-helper"
import {orange} from "@material-ui/core/colors"

interface ITabProps {
    children:React.ReactNode;
    value:number;
    index:number;
    dir:string;
}

const TabPanel:React.SFC<ITabProps> = function (props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div style={{
        margin:"0 0",
        padding:"0 0",
        // width:"100%",
        // height:"100%",
      }}
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
            <Box>
              {children}
            </Box>
        )}
      </div>
    );
}

function a11yProps(index:number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
  
const useStyles = makeStyles((theme:Theme) => (
    createStyles({
        root: {
            backgroundColor:"rgba(255,255,255,.3)",
            width: "100%",
            position:"relative",
            marginTop:"5.5em",
            overflowX:"hidden",
            height:"auto",
            display:"flex",
            justifyContent:"space-evenly",
            alignItems:"center",
            flexDirection:"column",
            "& > header:first-child":{
              marginRight: "50%",
              transform: "translateX(50%)",
              marginTop:"4em",
              width:"50%",
              position:"fixed",
              top:0
            }
        }
    })
))

interface IParams {
  userId:string
}

export interface ICard {
  image:string;
  owner:string;
  _id:string;
  status:string;
  createdAt:Date;
  comment:string;

}


export interface IUser {
  username:string;
  email:string;
  admin:boolean;
  verified:boolean;
  card?:ICard[];
  referral:string;
  referralCount:number;
}


const UserComponent = function(props:RouteComponentProps){
    const classes = useStyles()
    const theme = useTheme()
    const [value,setValue] = React.useState(0)
    const context = React.useContext(SnackbarContext)
    const [user,setUser] = React.useState<IUser>()
    
    const handleChange = (evt: any,newValue: any) => {
        setValue(newValue)
    }
    const handleChangeIndex = (idx:number) => {
        setValue(idx)
    }

    const jwt = retrieveJwt()    
    React.useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal
      if(jwt){
        read({signal,userId:jwt?.user._id},jwt.token).then(data => {
          if(data){
            if(data.user){
            setUser(data.user)
            context.handleOpen!({type:"info",message:`Welcome ${data.user.admin && "Admin"} ${data.user.username}`})
          }else{
            context.handleOpen!({type:"error",message:data.error || "Something went wrong"})
          }
          }else{
            context.handleOpen!({type:"info",message:`Something went wrong`})  
          }
        })
      return function(){
        abortController.abort()
      }
      }},[])

  // console.log("render")
  // if(!Boolean(user)){
  //   return <div>still loading</div>
  // }else{
  //   console.log("rendering again")
    return (
        <>
        <div className={classes.root}>
          <AppBar color="default" elevation={10} style={{
            zIndex:5
          }} >
            <Tabs
              value={value}
              onChange={handleChange}
              style={{
                 backgroundColor:orange[200]
              }}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              {[<DashboardIcon/>,<SyncAltIcon/>,
               <AccountBalanceWalletIcon/>,
                <PaymentIcon/>,<RecentActorsIcon/>].map((m,idx) => (
                <Tab key={idx} icon={m} label={`tab ${idx+1}`} {...a11yProps(idx)} />
              ))}
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} 
            dir={theme.direction}
            >
              {
                user?.username &&
              <Dashboard user={user} />
              }
            </TabPanel>
            <TabPanel value={value} index={1}
             dir={theme.direction}>
               <div style={{
               display:"flex",
               justifyContent:"center",
               alignItems:"center",
               padding:"0 1%",
               width:"98%",
               margin:"5em 0"
             }}>
              {
                user?.username && 
                <TransactionTable admin={user.admin} />
              }
               </div>
            </TabPanel>
            <TabPanel value={value} index={2}
             dir={theme.direction}
             >
               {
                 user?.admin &&
              <Dashboard user={user} />
               }
            </TabPanel>
          </SwipeableViews>
        <Footer/>
        </div>
        </>
      )
    // };
}

export default UserComponent