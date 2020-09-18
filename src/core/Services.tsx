import React from "react"
import {Box,Button} from "@material-ui/core"
import {deepOrange} from "@material-ui/core/colors"
import ServicesCard from "./ServicesCard"
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles"

const useStyles = makeStyles((theme:Theme) =>(
    createStyles({
        root:{
            width:"95%",
            margin:"0 2.5%",
            "& h3,h2":{
                fontSize:"2.3em",
                fontWeight:"500",
                letterSpacing:".05em",
                opacity:".95",
                WebkitBackgroundClip:"text",
                WebkitTextFillColor:"transparent",      
                backgroundImage:`linear-gradient(to bottom,black,${deepOrange[900]})`,
            },
            "& p":{
                textAlign:"left",
                fontSize:"1.5em",
                opacity:".85em",
                wordSpacing:".2em",
                transition:"all .3s linear",
                WebkitBackgroundClip:"text",
                WebkitTextFillColor:"transparent",      
                backgroundImage:`linear-gradient(to right,black,${deepOrange[900]})`,
           },
           [theme.breakpoints.down("sm")]:{
               "& h2,h3":{
                   fontSize:"1.5em",
                   textAlign:"center"
               },
               "& p":{
                   fontSize:"1em !important",
                   lineHeight:"1.4em !important"
               }
           }
        },
        headingContainer:{
            padding:theme.spacing(1,1.2),
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            "& p":{
                 textAlign:"left",
                 fontSize:"1.5em",
                 opacity:".85em",
                 lineHeight:"1em",
                 wordSpacing:".2em"
            },
            "& button":{
                fontSize:"1.2em",
                padding:theme.spacing(1.5,2),
                [theme.breakpoints.down("sm")]:{
                    padding:theme.spacing(1,2),
                    fontSize:".9em"
                }
            }
            
        },
        doMoreContainer:{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            // textAlign:"center !important",
            "& p":{
                textAlign:"center"
            }
        },
        tradeContainer:{
            width:"95%",
            margin:"1em auto",
            position:"relative",
            display:"grid",
            gridGap:"1em",
            gridTemplateColumns:"repeat(auto-fit,minmax(15em,1fr))",
            justifyContent:"center",
            gridAutoRows:"13em"
        },
        contactContainer:{
            width:"100%",
            margin:"8em auto",
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between",
            padding:".5em 1em",
            [theme.breakpoints.down("sm")]:{
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                "& div":{
                    margin:theme.spacing(.9,.2),
                    width:"100%",
                    display:"flex",
                    justifyContent:"center",
                    flexDirection:"column",
                    alignItems:"center"
                }
            }
        },
        headerContactContainer:{
            width:"35%",
            "& button":{
                width:"45%",
                padding:"1em",
                fontSize:"1.1em",
                [theme.breakpoints.down("sm")]:{
                    padding:theme.spacing(1,2),
                    fontSize:".9em"
                }
            }
        },
        cardContainer:{
            margin:theme.spacing(2,0),
            display:"grid",
            width:"50%",
            gridRowGap:"1em",
            [theme.breakpoints.down("sm")]:{
                width:"100% !important",
                "& > div":{
                    width:"15em"
                }
            }
        }
    })
))

const Services = function(props:any){
    const classes = useStyles()


    return(
        <Box className={classes.root}>
            <Box className={classes.headingContainer}>
            <h2 data-aos="flip-down" data-aos-delay={500}>Buy Gift Cards, Shop Easier</h2>
                <p data-aos="flip-down" data-aos-delay={900}>
                    You can take advantage of our gift card sales service and buy gift cards
                    easily and instantly delivered to your email. Easily pay for products and
                    also when shopping on websites like Amazon, eBay, Walmart and others. Stay
                    ahead of your peers when you purchase gift card codes to make payment on 
                    iTunes, google play, play station and the likes.
                </p>
            </Box>
            <Box className={classes.doMoreContainer}>
        <h2 data-aos="fade" data-aos-delay={1000}>
          Do More With PHONYTUNES
        </h2>
        <p data-aos="fade" data-aos-delay={1100}>
          Not limited to the purchase or sales of gift cards or bitcoins,
          you can easily do more with Phonystore, all on one platform.
        </p>
      </Box>
      <Box className={classes.tradeContainer}>
            {["Bitcoin","Ethereum","Amazon","Ebay","Apple"].map((m,idx) =>(
                <ServicesCard buy={idx < 2} duration={idx*350} isTrue={idx < 2} key={idx} heading={m} />
                )) }
      </Box>
      <Box className={classes.contactContainer}>
          <Box className={classes.headerContactContainer}>
              <h2 data-aos="fade-right" data-aos-delay={500}>
                  Ready to Begin ?
              </h2>
              <p data-aos="fade-down" data-aos-delay={1000}>
              Create an account with us within a minute to start buying
               and selling gift cards and bitcoins and withdraw your funds instantly, no delay.
              </p>
              <Button data-aos="fade" data-aos-delay={1200} style={{backgroundColor:"#E25855",color:"white"}}>Let's Go!</Button>
          </Box>
          <Box className={classes.cardContainer}>
              {["Whatsapp","Telegram","Instagram"].map((m,idx) => (
                  <ServicesCard duration={idx*350} buy={idx < 2} isTrue={idx < 2}  key={idx}/>
              ))}
          </Box>
      </Box>
    </Box>
    )
}

export default Services