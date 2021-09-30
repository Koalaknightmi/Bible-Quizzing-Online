//import theme from "../../styles/theme"
import makeStyles from '@mui/styles/makeStyles';

const styles = makeStyles((theme)=>({
  beginPagePaper:{
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  }
}));

export default styles