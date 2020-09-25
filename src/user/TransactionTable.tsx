import React,{ChangeEvent} from "react"
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles"
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@material-ui/core';
import {Accordion,AccordionDetails,AccordionSummary,AccordionActions} from "@material-ui/core"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Button,Typography,ButtonGroup,Box,TablePagination} from "@material-ui/core"
import Dialog from './Dialog'
import CheckIcon from "@material-ui/icons/CheckBoxSharp"
import {green,deepOrange,orange} from "@material-ui/core/colors"
import {ICard} from "./UserComponent"
import {getUserCard,updateCardStatus} from "./api-card"
import {retrieveJwt,IToken} from "../auth/auth-helper"
import {DialogContext} from "../config/SnackContext"
import CommentList from "../comment/CommentList"
import {IComment} from "../comment/Comment"

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
            },
            [theme.breakpoints.down("md")]:{
              padding:"1em .5em"
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
          [theme.breakpoints.down("md")]:{
            minWidth: 350,
          },
          [theme.breakpoints.down("sm")]:{
            minWidth:200,
            display:"flex",
            alignItems:"center",
            flexDirection:"column",
            "& > *":{
                width:"100%"
            }
          }
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
        },
        paginationContainer:{
          display:"flex",
          margin:"1em 0",
          marginLeft:"50%",
          transform:"translateX(-50%)",
          justifyContent:"center",
          overflow:"hidden",
          borderRadius:"5em",
          backgroundColor:deepOrange["A200"],
          [theme.breakpoints.down("sm")]:{
            width:"100%"
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
    const context = React.useContext(DialogContext)
    const [expanded, setExpanded] = React.useState<string | boolean>("5f6513b73d1a9e1cb4810eb0");
    const [open,setOpen] = React.useState(false)
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [cards,setCard ] = React.useState<ICard[]>()
    const [detail,setDetail] = React.useState<IDetail>({
      limit:5,
      page:0,
      total:0,
      pages:0
    })
    const jwt = retrieveJwt()
    
    const loadNewCardSet = (e:any,page:number) => {
      if(jwt){
        getUserCard({token:(jwt as IToken).token
          ,userId:(jwt as IToken).user._id},{
            limit:detail.limit,
            // page:detail.pages > 0 ? page+1 :  page
            page:0
          }).then((data) => {
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

    const newCardSet = (idx:number,card:ICard) => {
      const cardArr = cards
      const newCard = (cardArr as ICard[]).splice(idx,1,card)
      setCard(cardArr) 
    }

    const handleCardStatus = (type:string,id:string) => () => {
      const token = {
        token:(jwt as IToken).token,
        cardId:id
      }

      const foundIdx = cards?.findIndex((card,idx) => card._id === id)
        const updatedCard = {...(cards as ICard[])[(foundIdx as number)],status:type}
        newCardSet((foundIdx as number),updatedCard)
      
      updateCardStatus(token,{status:type}).then(data => {
        if(data){
          if(data.message){
            context.handleOpen!({type:"success",message:`Transaction of id ${id} has been updated`})
          }else{
            context.handleOpen!({type:"error",message:data.error || "Somehting went wrong"})  
          }
        }else{
          context.handleOpen!({type:"info",message:`Something went wrong`})
          
        }
      })
    }
    const handleCardUpdate = (comment:IComment,id:string) => {
        const foundIdx = cards?.findIndex((card,idx) => card._id === id)
        const formerCard = (cards as ICard[])[(foundIdx as number)]
        const updatedCard = {...formerCard,comments:formerCard.comments.concat(comment)}
        newCardSet((foundIdx as number),updatedCard)
    }
    
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
          {cards && cards.length > 0 ?
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow className={classes.textHeader}>
                <TableCell align="center"><span>Date</span></TableCell>
                {/* <TableCell align="center"><span>Comment</span></TableCell> */}
                <TableCell ><span>Status</span></TableCell>
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
                    {/* <TableCell align="right"><span>{`${card.comment.substring(0,40)}...`}</span></TableCell> */}
                    <TableCell className={classes.statusContainer}
                    align="right"><span>{card.status === "Success" ? "Success"
                      : card.status === "Failed" ? "Failed" : "Pending"}</span>
                      {/* <CheckIcon/> */}
                    </TableCell>
                  </AccordionSummary>
                  <AccordionDetails className={classes.details}>
                      <div className={classes.imageContainer} style={{
                          borderRadius:".5em",
                          backgroundImage:`url(${card.image})`
                      }} />
                    <Box className={classes.helper}>
                      <CommentList handleCardUpdate={handleCardUpdate}
                       transactionId={card._id} comments={card.comments} />
                    </Box>
                  </AccordionDetails>
                  {(jwt as IToken).user.admin &&
                  <AccordionActions>
                    {
                      card.status === "Pending" ?
                      <ButtonGroup>
                        <Button onClick={handleCardStatus("Success",card._id)} style={{
                          backgroundColor:"black",
                          color:deepOrange["A200"]
                        }}>
                          Complete Transaction
                        </Button>
                        <Button onClick={handleCardStatus("Failed",card._id)} style={{
                          backgroundColor:deepOrange["A200"],
                          color:"black"
                        }}>
                          Reject Transaction
                        </Button>
                      </ButtonGroup> : 
                      card.status === "Failed" && 
                      <Button onClick={handleCardStatus("Success",card._id)} style={{
                        backgroundColor:"black",
                        color:deepOrange["A200"]
                      }}>
                        Complete Transaction
                      </Button>
                    }
                  </AccordionActions>
}
                </Accordion>
              </TableRow>
              ))}
            </TableBody>
          </Table>
            <TablePagination defaultValue={["5","10","15","20","25","30"]}
             className={classes.paginationContainer} onChangeRowsPerPage={handleChangeRowsPerPage}
              page={detail!.page -1} onChangePage={loadNewCardSet}
              count={detail!.total} rowsPerPage={detail!.limit} />
        </TableContainer>
         :  <Typography variant="h5" >No Transaction available</Typography>}
          <Button onClick={handleToggle} style={{
            color:"rgba(0,0,0,.9)",
            backgroundColor:deepOrange["A200"]
            }}>Create New Transaction</Button>
          <Dialog open={open} blog={false}
           updateCardList={updateCardList}
           handleToggle={handleToggle} />
        </Box>
      );
}    

export default SimpleTable