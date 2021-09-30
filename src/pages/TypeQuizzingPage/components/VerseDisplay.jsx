import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import {upperCaseChName} from "../../../utils/verseUtils"
const VerseDisplay = ({
  verse,
  classes,
  time,
  vref,
  score
}) => (
  <Paper className={classes.verseCont}>
    <Container className={classes.verseData}>
      <Container>
      {time} 
      </Container>
      <Container>
      {upperCaseChName(vref)} 
      </Container>
      <Container>
      {score}
      </Container>
    </Container>
    {
      verse.map((v,i)=>(<span key={i}>{v}</span>))
    }
  </Paper>
)

export default VerseDisplay