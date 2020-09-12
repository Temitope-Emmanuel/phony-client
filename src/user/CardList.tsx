import React from 'react';
import { makeStyles,createStyles,Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import {Accordion,
        AccordionDetails,
        AccordionSummary,
        AccordionActions,
        Typography,Button,
        Box,Divider,Grow
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Link} from "react-router-dom"
import {green,red} from "@material-ui/core/colors"
// import Dialog from "./Dialog"
import {TransitionGroup,CSSTransition} from "react-transition-group"
import {ICard} from "./UserComponent"
// import "../../assets/styles/transition.css"

const useStyles = makeStyles((theme:Theme) => (
    createStyles({
        root: {
          width: '90%',
          padding:theme.spacing(2,0),
        },
        heading: {
          fontSize: theme.typography.pxToRem(25),
          fontWeight:500,
          opacity:".9",
          letterSpacing:".09em"
        },
        headingContainer:{
          display:"flex",
          flexDirection:"row",
          justifyContent:"space-between",
          alignItems:"center",
          width:"100%",
          textTransform:"capitalize",
          [theme.breakpoints.down("xs")]:{
            fontSize:".8em"
          }
        },
        details: {
          display:"flex",
          flexDirection:"row",
          justifyContent:"space-between",
          height:"100%",
          margin:theme.spacing(0,-.4),
          fontSize:"1.2em",
          [theme.breakpoints.down("md")]:{
            flexDirection:"column",
            alignItems:"center",
          }
        },
        imageContainer:{
          height:"13em",
          width:"20em",
          backgroundPosition:"center",
          backgroundRepeat:"no-repeat",
          backgroundSize:"fit",
          backgroundColor:"purple",
          borderRadius:"1em",
          [theme.breakpoints.down("xs")]:{
          width:"100%",
          height:"8em",
          backgroundColor:"blue"
          },
        },
        helper: {
          borderLeft: `2px solid black`,
          padding: theme.spacing(10, 2),
          width:"40%",
          display:"flex",
          alignItems:"center",
          flexDirection:"column",
          [theme.breakpoints.down("md")]:{
            borderLeft:"none",
            padding:theme.spacing(0,2),
            width:"100%",
            height:"40%"
          }
        },
        link:{
            display:"block",
            textDecoration:"none",
            float:"right",
            color:green[400],
            transition:"all .4s ease",
            marginBottom:theme.spacing(2),
            "&:hover":{
                color:green[700],
                fontWeight:600
            }
        },
        buttonContainer:{
          "& button":{
            margin:theme.spacing(1,.9)
        }
        },
        AccordionContainer:{},
        column:{},
        detailParagraph:{}
       })
));


interface IProps {
    cards:ICard[];
    updateCardList(arg:ICard):void
}

const CardList:React.SFC<IProps> = function({cards,...props}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | boolean>(false);
  // const [open,setOpen] = React.useState(false)
  const [showForm,setShowForm] = React.useState(false)
  const [user,setUser] = React.useState({

  })
  
  // React.useEffect(() => {
  //     const abortController = new AbortController()
  //     const signal = abortController.signal
  //     if(params.userId){
  //         read({signal,userId:jwt?.user._id},jwt!.token).then(data => {
  //             if(data && data.error){
  //                 console.log(data)
  //             }else{
  //                 setUser(user)
  //             }
  //         })
  //     }
  //     return function(){
  //         abortController.abort()
  //     }
  // },[])
  // const handleToggle = () => {
  //     setOpen(!open)
  // }
  const handleChange = (panel:string) => (event:any, isExpanded:boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
    {/* <Dialog open={open} updateCardList={props.updateCardList} handleToggle={handleToggle} /> */}
      <div className={classes.root}>
        <TransitionGroup>
      {cards.map((card) => (
          <CSSTransition 
          key={card._id}
          classNames="page"
          timeout={500}
          >      
      <Accordion
      //  transitiononprops={{unmountOnExit:true}} 
       className={classes.AccordionContainer}
       elevation={10}
       key={card._id}
       onChange={handleChange(card._id)}
       expanded={expanded === card._id}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={card._id}
          id={card._id}>
            <Box className={classes.headingContainer}>
              <Typography className={classes.heading}>{card.owner}</Typography>
              {expanded !== card._id ? <img height="25" alt="card-img" src={card.image}/> : null}
            </Box>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
            <div className={classes.imageContainer} style={{
                borderRadius:".5em",
                backgroundImage:`url(${card.image})`
            }} />
          <div className={clsx(classes.column, classes.helper)}>
            <p className={classes.detailParagraph} >
                {card.comment}
            </p>
            <Link to={`/campground/${card._id}`} 
                className={classes.link}>
                Learn more
              </Link>
          </div>
        </AccordionDetails>
        <Divider style={{backgroundColor:"rgba(0,0,0,.4)",margin:"0 1.4em"}} />
        {/* <AccordionActions className={classes.buttonContainer} style={{float:"left",margin:"0 .5em"}}>
          <Button size="small"
          onClick={() => deleteCampground(camp._id)}
           style={{
              backgroundColor:red[900]
          }}>Delete</Button>
          <Button size="small" 
          onClick={handleForm}
          style={{
              backgroundColor:green[500]
          }}>
            Edit
          </Button>
        </AccordionActions> */}
      </Accordion>
          </CSSTransition>
      ))}
        </TransitionGroup>
      </div>    
    </>
  );
}
 export default React.memo(CardList)