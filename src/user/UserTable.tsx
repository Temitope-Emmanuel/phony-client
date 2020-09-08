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
import {blue} from '@material-ui/core/colors'
import Dialog from './Dialog'
import BurstModeIcon from '@material-ui/icons/BurstMode';
import CheckIcon from "@material-ui/icons/CheckBoxSharp"
import {green} from "@material-ui/core/colors"

const useStyles = makeStyles((theme:Theme) => (
    createStyles({
        root:{
            display:"flex",
            flexDirection:"column",
            justifyContent:"end",
            padding:"0 1em",
            "& > button":{
              margin:'1em 0',
              padding:".8em 1em"
            },
            "& > h3":{
              fontSize:"1.8em",
              fontWeight:"500"
            }
        },
          table: {
          minWidth: 650,
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

const SimpleTable= function({...props}){
    const classes = useStyles()
    const [open,setOpen] = React.useState(false)
    const handleToggle = () => {
        setOpen(!open)
    }

    return (
        <Box className={classes.root}>
          <h3>Most Recent Transaction</h3>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Comment</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Image</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell className={classes.statusContainer} align="right"><span>{row.carbs ? "Success" : "Pending"}</span><CheckIcon/></TableCell>
                  <TableCell align="right"><BurstModeIcon/></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button onClick={handleToggle} style={{
          backgroundColor:blue[300],
          color:blue[900]
        }}>Create New Transaction</Button>
        <Dialog open={open} handleToggle={handleToggle} />
        </Box>
      );
}    

export default SimpleTable