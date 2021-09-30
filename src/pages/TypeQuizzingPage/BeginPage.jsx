import {useContext, useState, useEffect} from "react"
import {SeasonContext} from "../../components/Season"

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import usestyle from './style'
import ChapterSettings from "../../components/ChapterSettings"
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';

import typeQuizzingTypes from "../../static/typeQuizzingTypes"

import useKeydown from "../../utils/hooks/useKeydown"
import { useSelector, useDispatch } from 'react-redux'
import {
  changePrompt,
  changeType,
  changefirstLetter,
  changeCompetePreset,
  toggleCompeting,
  toggleJustMemory
} from '../../reducers/typeQuizzing'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },    
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left"
  },
  getContentAnchorEl: null
};

const BeginPage = ({onStart,log}) => {
  const season = useContext(SeasonContext)
  const chapters = useSelector((state) => state.typeQuizzing.chapters)
  const range = useSelector((state) => state.typeQuizzing.range)
  const rangeVal = useSelector((state) => state.typeQuizzing.rangeVal)
  const type = useSelector((state) => state.typeQuizzing.type)
  const prompt = useSelector((state) => state.typeQuizzing.prompt)
  const firstLetter = useSelector((state) => state.typeQuizzing.firstLetter)
  const justMemory = useSelector((state) => state.typeQuizzing.justMemory)
  const compete = useSelector((state) => state.typeQuizzing.compete)
  const dispatch = useDispatch()
  const classes = usestyle()
  const [canStart,setCanStart] = useState(false)

  useEffect(()=>{
    if(rangeVal.startingChapter!==""&&rangeVal.endingChapter!==""&&range){
      setCanStart(true);
    } else if(chapters.length!==0&&!range){
      setCanStart(true)
    } else{
      setCanStart(false)
    }
  },[rangeVal,chapters,range,canStart])

  useKeydown((e)=>{
    if(e.keyCode===13&&canStart){
      onStart()
    }
  })

  const handleTypeChange = (e) => {
    dispatch(changeType(e.target.value))
  }
  const handlePromptChange = (e) => {
    dispatch(changePrompt(e.target.value))
  }
  const handlefirstLetterChange = (e) => {
    dispatch(changefirstLetter(e.target.value))
  }
  const handleMemoryToggle = (e) => {
    dispatch(toggleJustMemory(e.target.value))
  }
  const handleCompeteToggle = (e) => {
    dispatch(toggleCompeting(e.target.value))
  }

  return (
    <Paper className={classes.beginPagePaper}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <ChapterSettings
          classes = {classes}
          reduxState = {"typeQuizzing"}
        />
        <Grid item xs={12} sm={6}>
          <h4>Select the type of practice you want to do.</h4>
          <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-checkbox-label">Select Type</InputLabel>
              <Select
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                value={type}
                onChange={handleTypeChange}
                input={<Input />}
                MenuProps={MenuProps}
              >
                {typeQuizzingTypes.map((ch,i) => (
                  <MenuItem key={ch.type} value={i}>
                    <ListItemText primary={ch.type} />
                  </MenuItem>
                ))}}
              </Select>
            </FormControl>
        </Grid>
        <Grid className={classes.toggle1} item xs={12} sm={6}>
          <FormGroup component="fieldset">
            <FormControlLabel
              className={classes.toggle}
              control={<Switch checked={prompt} onChange={handlePromptChange} name="prompt" />}
              label="Do you want a Prompt?"
            />
            <FormControlLabel
              className={classes.toggle}
              control={<Switch disabled checked={firstLetter} onChange={handlefirstLetterChange} name="firstLetter" />}
              label="Do you want to Type the first letter of each word?"
            />
            <FormControlLabel
              className={classes.toggle}
              control={<Switch disabled checked={justMemory} onChange={handleMemoryToggle} name="firstLetter" />}
              label="Do you want to just quiz on Memory Verses?"
            />
            <FormControlLabel
              className={classes.toggle}
              control={<Switch disabled checked={compete} onChange={handleCompeteToggle} name="firstLetter" />}
              label="Do you want to compete for the leaderboard?"
            />
          </FormGroup>
        </Grid>

        <Grid className={classes.toggle1} item xs={12} sm={9}></Grid>
        <Grid className={classes.toggle1} item xs={12} sm={3}>
          <Button
            className={classes.startBtn}
            variant="contained" 
            color="secondary" 
            onClick = {onStart}
            disabled = {!canStart}
          >
            Start
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BeginPage