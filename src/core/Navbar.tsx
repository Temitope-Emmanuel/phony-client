import React from 'react'
import {useEffect} from 'react'
import {makeStyles } from '@material-ui/core/styles';
import {useHistory,useLocation} from "react-router-dom"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import {Box, createStyles, Theme} from "@material-ui/core"
import {deepOrange,red,orange} from "@material-ui/core/colors"
import {Link} from "react-router-dom"

const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
            "& div":{
              padding:theme.spacing(0,0.5)
            }
          },
        appContainer:{
            transition:"all .3s ease-in",
            padding:"0 2.5em",
            width:"100vw",
            // marging:"0 2.5em"
          },
          menuButton: {
            marginRight: theme.spacing(2),
          },
          title: {
            display: 'flex',
            alignItems:"center",
            "& svg":{
              fontSize:"2.2em",
              color:deepOrange[900]
            },
            "& a":{
              textDecoration:"none",
              color:"black",
              fontSize:".9em",
              fontWeight:"400",
              letterSpacing:".15em",
              alignSelf:"center"
            },
            [theme.breakpoints.up('sm')]: {
              fontSize:"1.5em"
            },
            [theme.breakpoints.down("xs")]:{
              "& a":{
                fontSize:"1em",
                letterSpacing:".22em"
              },
              "& svg":{
                fontSize:"2.5em"
              }
            }
          },
          sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
              display: 'none',
            },
          },
          sectionDesktop:{},
          hrefContainer:{
            width:"50%",
            display:"flex",
            justifyContent:"space-evenly",
            "& a":{
              fontSize:"1.2em",
              textDecoration:"none",
              color:"rgba(0,0,0,.8)",
              textTransform:"capitalize",
              letterSpacing:".1em",
              fontWeight:"500",
              padding:theme.spacing(1, .1),
              transition:"color .3s linear",
              "&::after":{
                content:"' '",
                display:"block",
                height:"2.5px !important",
                width:"0%",
                backgroundImage:`linear-gradient(to right,rgba(0,0,0,1),${deepOrange[900]},black)`,
                transition:"0.35s ease-out all",
              },
              "&:hover":{
                color:"rgba(0,0,0,1)",
                "&::after":{
                  height:"2.5px !important",
                  width: "100%",
                },
              }
            },
            // display: 'none',
            [theme.breakpoints.up('md')]: {
              display: 'flex',
            }
          }
    })
)

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation()
  const atHome = location.pathname === "/"
  const [isReady,setIsReady] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [scrolling,setScrolling] = React.useState({
    scrollTop:0,
    scrolling:false
  })
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  const onScroll = (e:any) => {
    setScrolling(curSt => ({
      scrollTop:e.target.documentElement.scrollTop,
      scrolling:e.target.documentElement.scrollTop > 100
    }))
  }
  React.useEffect(() => {
    window.addEventListener("scroll",onScroll)
    return function (){
      window.removeEventListener("scroll",onScroll)
    }
  },[])
  const handleProfileMenuOpen = (event: { currentTarget: React.SetStateAction<null>; }) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuOpen = (event: { currentTarget: React.SetStateAction<null>; }) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
    anchorEl={mobileMoreAnchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    id={mobileMenuId}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={isMobileMenuOpen}
    onClose={handleMobileMenuClose}
>
 {["Blog","Rates","Contact","Referral","Newsletter"].map((m,idx) => (
   <MenuItem key={idx}>
      <Link to="/">
        <a style={{textDecoration:"none",color:"inherit"}}>
          {m}
        </a>
      </Link>
   </MenuItem>
  ))}
</Menu>)

  return (
    <>
      <AppBar className={classes.appContainer} elevation={0} 
        style={{
        backgroundColor:!atHome ? orange[200] : scrolling.scrolling ? orange["A400"] : "transparent"}}>
      <Toolbar disableGutters >
          <Box className={classes.title}>
            <Link to="/">
            PHONYTUNES
            </Link>
          </Box>
          <div className={classes.grow} />
          <div className={`${classes.hrefContainer} ${classes.sectionDesktop}`}>
            <Link to="/user">
              Blog
            </Link>
            <Link to="/">
              Referral
            </Link>
            <Link to="/rates">
              Rates
            </Link>
            <Link to="/">
              Contact
            </Link>
            <Link to="/">
              Newsletter
            </Link>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              color="inherit"
            //   onClick={handleMobileMenuOpen}
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
}

export default Navbar