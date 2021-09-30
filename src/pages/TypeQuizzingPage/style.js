//import theme from "../../styles/theme"
import makeStyles from '@mui/styles/makeStyles';

const styles = makeStyles((theme)=>({
  formControl: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(2),
    minWidth: 180,
    maxWidth: 180,
  },
  del:{
  },
  beginPagePaper:{
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  paper:{
    padding: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      padding: theme.spacing(2),
    },
    height:160
  },
  toggle1:{
    textAlign:"center",
    padding: theme.spacing(2),
    margin: theme.spacing(2)
  },
  toggle:{
    marginLeft:theme.spacing(2)
  },
  startBtn:{
    width:"100%",
    height:"100%"
  },
  verseCont:{
    fontSize:24,
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
    padding: theme.spacing(3),
    minHeight: 200
  },
  verseData:{
    fontSize:32,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2)
  }
}));

export default styles