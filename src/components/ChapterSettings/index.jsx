import {useContext} from "react"
import {SeasonContext} from "../../components/Season"
import { useSelector, useDispatch } from 'react-redux'
import * as typeQuizzing from '../../reducers/typeQuizzing'
import Settings from "./settings"
const dispatchers = {
  typeQuizzing,
}

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

export default ({classes,reduxState}) => {
  const season = useContext(SeasonContext)
  const chapters = useSelector((state) => state[reduxState].chapters)
  const range = useSelector((state) => state[reduxState].range)
  const rangeVal = useSelector((state) => state[reduxState].rangeVal)
  const dispatch = useDispatch()

  const handleChapterChange = (e) => {
    dispatch(dispatchers[reduxState].setChapters(e.target.value))
  }
  const handleChapterClear = (e) => {
    dispatch(dispatchers[reduxState].clearChapters(e.target.value))
  }
  const handleStartChapterRangeChange = (e) => {
    let val = e.target.value
    dispatch(dispatchers[reduxState].setRange({obj:"startingChapter",val,endingChapter:val,lastVerse:season.season.season[val].verses.length,}))
  }
  const handleEndChapterRangeChange = (e) => {
    let val = e.target.value
    dispatch(dispatchers[reduxState].setRange({obj:"endingChapter",val,startingChapter:val,lastVerse:season.season.season[val].verses.length,}))
  }
  const handleEndVerseRangeChange = (e) => {
    let val = e.target.value
    dispatch(dispatchers[reduxState].setRange({obj:"endingVerse",val}))
  }
  const handleStartVerseRangeChange = (e) => {
   dispatch(dispatchers[reduxState].setRange({obj:"startingVerse",val}))
  }
  const handleRangeChange = (e) => {
    dispatch(dispatchers[reduxState].toggleRange(e.target.value))
  }

  return (
    <>
      <Settings
        {...{
          handleChapterClear,
          handleChapterChange,
          handleStartChapterRangeChange,
          handleEndChapterRangeChange,
          handleEndVerseRangeChange,
          handleStartVerseRangeChange,
          handleRangeChange,
          classes,
          chapters,
          season:season.season.season,
          range,
          rangeVal,
          MenuProps
        }}
      />
    </>
  )
}