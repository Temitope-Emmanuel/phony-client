import React from "react"
import {makeStyles,withStyles,createStyles,Theme} from "@material-ui/core/styles"
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow, Dialog} from '@material-ui/core';
import {Box,Paper,Typography} from "@material-ui/core"
import {getTopReferrals} from "../user/api-user"
import {DialogContext} from "../config/SnackContext"
import {deepOrange} from "@material-ui/core/colors"

interface IReferral {
    username:string;
    referral:string;
    referralCount:number
}


const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: deepOrange["100"],
      },
      "& *":{
          fontSize:"1.2em"
      }
    },
  }),
)(TableRow);

const useStyles = makeStyles((theme:Theme) => (
    createStyles({
        root:{
            marginTop:"5em",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"column",
            "& > h4":{
                margin:".5em 0",
                [theme.breakpoints.down("sm")]:{
                    marginTop:"1.5em"
                }
            },
            [theme.breakpoints.down("sm")]:{
                width:"95%",
                display:"flex",
                alignItems:"center",
                margin:"2.5%"
            }
        },
        table: {
                minWidth: 750,
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
            width:"75%",
            [theme.breakpoints.down("sm")]:{
                width:"100%",
                minWidth:200
            }
        }
      })
));
  

const Referral = () => {
    const classes = useStyles()
    const context = React.useContext(DialogContext)
    const [referrals,setReferrals] = React.useState<IReferral[]>([])
    
    React.useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        getTopReferrals(signal).then(data => {
            if(data){
                if(data.error){
                    context.handleOpen!({type:"error",
                    message:data.error || "Something went wrong"})
                }else{
                    setReferrals(data.data)
                    context.handleOpen!({type:"info",
                    message:"View the list of top referral in our ongoing referral Raffle"})
                }    
            }else{
                context.handleOpen!({type:"warning",
                message:"Something went wrong Please try again later"})
            }
        })
    },[])

    return(
        <Box className={classes.root}>
            <Typography variant="h4">
                Top Referral
            </Typography>
            <TableContainer className={classes.tableContainer} component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>POSITION</StyledTableCell>
                            <StyledTableCell align="right">USERNAME</StyledTableCell>
                            <StyledTableCell align="right">REFERRAL - COUNT</StyledTableCell>
                            <StyledTableCell align="right">REFERRAL - CODE</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {referrals && referrals.map((item,idx) => (
                        <StyledTableRow key={idx}>
                            <StyledTableCell component="th" scope="row">
                                {idx+1}
                            </StyledTableCell>
                            <StyledTableCell align="right">{item.username}</StyledTableCell>
                            <StyledTableCell align="right">{item.referralCount}</StyledTableCell>
                            <StyledTableCell align="right">{item.referral}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}


export default Referral