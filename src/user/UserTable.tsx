import React from "react"
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
          table: {
          minWidth: 750,
          overflow:"hidden",
          borderRadius:".2em .2em 2em 2em"
        },
        tableContainer:{
          borderLeft:"rgba(0,0,0,.5) solid 3px",
          borderRight:"rgba(0,0,0,.5) solid 3px",
          overflowX:"hidden",
          borderRadius:"0 1em 1em 0",
          "& > *":{
            borderBottom:"rgba(0,0,0,.5) solid 3px",
            backgroundColor:"white"
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
        }
    })
))

function createData(name:number, calories:string, fat:string, carbs:boolean, protein:number) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData(1, "05/10", "please Bro hurry", true, 4.0),
    createData(2, "05/21", "Need as soon as possible", true, 4.3),
    createData(3, "05/22", "Can i get a discount", true, 6.0),
    createData(4, "06/1", "ASAP", false, 4.3),
    createData(5, "06/5", "Do you do Westen you", false, 3.9),
];

interface IProps {
  card:ICard[]
}

const SimpleTable:React.SFC<IProps> = function({card}){
    const classes = useStyles()
    const [open,setOpen] = React.useState(false)
    const handleToggle = () => {
        setOpen(!open)
    }
    console.log(card)
    return (
        <Box className={classes.root}>
          <h3>Most Recent Transaction</h3>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow className={classes.textHeader}>
                <TableCell align="right"><span>Date</span></TableCell>
                <TableCell align="right"><span>Comment</span></TableCell>
                <TableCell align="right"><span>Status</span></TableCell>
                <TableCell align="right"><span>Image</span></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableContainer}>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="right"><span>{row.calories}</span></TableCell>
                  <TableCell align="right"><span>{row.fat}</span></TableCell>
                  <TableCell className={classes.statusContainer}
                   align="right"><span>{row.carbs ? "Success"
                    : "Pending"}</span><CheckIcon/>
                  </TableCell>
                  <TableCell align="right"><BurstModeIcon/></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button onClick={handleToggle} style={{
          color:"rgba(0,0,0,.9)",
          backgroundColor:deepOrange["A200"]
          }}>Create New Transaction</Button>
        <Dialog open={open} handleToggle={handleToggle} />
        </Box>
      );
}    

export default SimpleTable