import React,{ChangeEvent} from "react"
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles"
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@material-ui/core';
import {Accordion,AccordionDetails,AccordionSummary,AccordionActions} from "@material-ui/core"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Button,Box,TablePagination} from "@material-ui/core"
import Dialog from './Dialog'
import CheckIcon from "@material-ui/icons/CheckBoxSharp"
import {green,deepOrange,orange} from "@material-ui/core/colors"
import {ICard} from "./UserComponent"
import {getUserCard} from "./api-card"
import {retrieveJwt,IToken} from "../auth/auth-helper"


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


interface IDetail {
  limit:number;
  page:number;
  total:number;
  pages:number
}

interface IProps {
  admin:boolean;
}

const SimpleTable:React.SFC<IProps> = function(props){
    const classes = useStyles()
    const [expanded, setExpanded] = React.useState<string | boolean>(false);
    const [open,setOpen] = React.useState(false)
    // const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [cards,setCard ] = React.useState<ICard[]>()
    const [detail,setDetail] = React.useState<IDetail>({
      limit:10,
      page:0,
      total:0,
      pages:0
    })
    const jwt = retrieveJwt()
    
    const loadNewCardSet = (e:any,page:number) => {
      if(jwt){
        console.log("page number",page)
        getUserCard({token:(jwt as IToken).token
          ,userId:(jwt as IToken).user._id},{
            limit:detail.limit,
            page:page+1
          }).then((data) => {
            console.log("this is the return value",data)
          if(data.docs){
            setCard(data.docs)
            setDetail({limit:data.limit,total:data.total,page:data.page,pages:data.pages})
          }
        })
      }
    }

    React.useEffect(() => {
      const abortController = new AbortController()
      const {signal} = abortController
      loadNewCardSet(null,1)
      return function (){
        abortController.abort()
      }
    },[])

    // const handleChangePage = ( event:unknown, newPage:number) => {
    //   setPage(newPage);
    // };
  
    const handleChangeRowsPerPage = (event:ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 5));
      // setPage(0);
    };
  
    const handleToggle = () => {
        setOpen(!open)
    }
    const handleChange = (panel:string) => (event:any, isExpanded:boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
    const updateCardList = (card:ICard) => {
      const newCard = cards
      newCard?.unshift(card)
      setCard(newCard)
    }

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
              {cards && cards.map((card) => (
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
            <TablePagination style={{
              width:"65%",
              display:"flex",
              margin:"1em 0",
              marginLeft:"50%",
              transform:"translateX(-50%)",
              justifyContent:"center",
              overflow:"hidden",
              borderRadius:"5em",
              backgroundColor:deepOrange["A200"]
            }} onChangeRowsPerPage={handleChangeRowsPerPage}
              page={detail!.page -1} onChangePage={loadNewCardSet}
              count={detail!.total} rowsPerPage={detail!.limit} />
        </TableContainer>
          <Button onClick={handleToggle} style={{
            color:"rgba(0,0,0,.9)",
            backgroundColor:deepOrange["A200"]
            }}>Create New Transaction</Button>
          <Dialog open={open} updateCardList={updateCardList}
           handleToggle={handleToggle} />
        </Box>
      );
}    

export default SimpleTable