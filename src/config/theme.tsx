import {createMuiTheme} from "@material-ui/core/styles"
import {deepOrange,deepPurple} from "@material-ui/core/colors"

export default createMuiTheme({
    // typography:{
    //     useNextVariants:true,
    // },
    palette:{
        secondary:{
            light:deepPurple["A200"],
            main:deepPurple[700],
            dark:deepPurple[900],
            contrastText:'#fff'
        },
        primary:{
            light:deepOrange["A200"],
            main:deepOrange[700],
            dark:deepOrange[900],
            contrastText:'#fff'
        },
        // openTitle:'#3f4771',
        // protectedTitle:green[400],
        type:'light'
    }
})