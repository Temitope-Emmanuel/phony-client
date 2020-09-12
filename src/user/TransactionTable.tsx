import React from "react"
import clsx from "clsx"
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles"
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@material-ui/core';
import {Accordion,AccordionDetails,AccordionSummary,AccordionActions} from "@material-ui/core"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import {Button,Box} from "@material-ui/core"
import Dialog from './Dialog'
import BurstModeIcon from '@material-ui/icons/BurstMode';
import CheckIcon from "@material-ui/icons/CheckBoxSharp"
import {green,deepOrange,orange} from "@material-ui/core/colors"
import {ICard} from "./UserComponent"

const useStyles = makeStyles((theme:Theme) => (
    createStyles({
        root:{
            display:"flex",
            flexDirection:"column",
            justifyContent:"end",
            backgroundColor:orange[200],
            borderRadius:".4em",
            padding:"1em 1.5em",
            overflowX:"hidden",
            "& > button":{
              margin:'1em 0',
              padding:".8em 1em"
            },
            "& > h3":{
              fontSize:"2em",
              fontWeight:500,
              color:"rgba(0,0,0,.8)"
            },
            "& > div":{
              backgroundColor:orange[200] 
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
        table: {
          minWidth: 750,
          overflow:"hidden",
          borderRadius:".2em .2em 2em 2em"
        },
        tableContainer:{
          borderLeft:"rgba(0,0,0,.5) solid 3px",
          borderRight:"rgba(0,0,0,.5) solid 3px",
          overflowX:"hidden",
          display:"flex",
          justifyContent:"center",
          flexDirection:"column",
          alignItems:"center",
          width:"100%",
          "& > *":{
            borderBottom:"rgba(0,0,0,.5) solid 3px",
            backgroundColor:"white",
            width:"100%"
          }
        },
        statusContainer:{
          display:"flex",
          justifyContent:"center",
          flexDirection:"row",
          alignItems:"center",
          "& > svg":{
            backgroundColor:green[100],
            color:green[300],
            borderRadius:"50%",
            fontSize:"2em",
            marginLeft:".4em",
            marginTop:".2em"
          }
        },
        textHeader:{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          backgroundColor:deepOrange["A200"],
          "& > *":{
            fontSize:"1.2em",
            textTransform:"uppercase",
            fontWeight:600,
            color:"white",
            [theme.breakpoints.down("sm")]:{
                 width:"min-content"
            }
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
        AccordionContainer:{},
        detailParagraph:{},
        accordionSummary:{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          "& > div":{
            justifyContent:"space-between"
          }
        }
    })
))

function createData(name:number, calories:string, fat:string, carbs:boolean, protein:number) {
    return { name, calories, fat, carbs, protein };
}

interface IProps {
  cards:ICard[];
  updateCardList(arg:ICard):void
}

const SimpleTable:React.SFC<IProps> = function({cards,updateCardList}){
    const classes = useStyles()
    const [expanded, setExpanded] = React.useState<string | boolean>(false);
    const [open,setOpen] = React.useState(true)
  
    const handleToggle = () => {
        setOpen(!open)
    }
    const handleChange = (panel:string) => (event:any, isExpanded:boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
    return (
        <Box className={classes.root}>
          <h3>Most Recent Transaction</h3>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow className={classes.textHeader}>
                <TableCell align="center"><span>Date</span></TableCell>
                <TableCell align="center"><span>Comment</span></TableCell>
                <TableCell style={{marginRight:"3em"}}><span>Status</span></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableContainer}>
              {cards.map((card) => (
              <TableRow key={card._id}>
                <Accordion className={classes.AccordionContainer}
                key={card._id} expanded={expanded === card._id}
                onChange={handleChange((card._id as string))}
                >
                  <AccordionSummary className={classes.accordionSummary} id={card._id}
                   expandIcon={<ExpandMoreIcon />} aria-controls={card._id}>
                    <TableCell align="right"><span>{new Date(card.createdAt).toLocaleDateString()}</span></TableCell>
                    <TableCell align="right"><span>{`${card.comment.substring(0,40)}...`}</span></TableCell>
                    <TableCell className={classes.statusContainer}
                    align="right"><span>{card.status === "Success" ? "Success"
                      : "Pending"}</span><CheckIcon/>
                    </TableCell>
                  </AccordionSummary>
                  <AccordionDetails className={classes.details}>
                      <div className={classes.imageContainer} style={{
                          borderRadius:".5em",
                          backgroundImage:`url(${card.image})`
                      }} />
                    {/* <div className={clsx(classes.column, classes.helper)}> */}
                    <div className={classes.helper}>
                      <p className={classes.detailParagraph} >
                          {card.comment}
                      </p>
                      {/* <Link to={`/campground/${card._id}`} 
                          className={classes.link}>
                          Learn more
                        </Link> */}
                    </div>
                  </AccordionDetails>
                </Accordion>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button onClick={handleToggle} style={{
          color:"rgba(0,0,0,.9)",
          backgroundColor:deepOrange["A200"]
          }}>Create New Transaction</Button>
        <Dialog open={open} updateCardList={updateCardList} handleToggle={handleToggle} />
        </Box>
      );
}    

export default SimpleTable