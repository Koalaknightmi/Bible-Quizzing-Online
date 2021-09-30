import { useContext, useState, useEffect, useReducer } from 'react';
import { SeasonContext } from '../../components/Season';
import { useSelector, useDispatch } from 'react-redux';
import usestyle from './style';
import useKeydown from '../../utils/hooks/useKeydown';
import useVerses from '../../utils/hooks/useVerses';
import useTime, { toMinSec } from '../../utils/hooks/useTimer';
import VerseDisplay from './components/VerseDisplay';
import typeQuizzingTypes from '../../static/typeQuizzingTypes';
import calcTypeScore from '../../utils/calcTypeScore';

const promptSizes = {
  full: 15,
  word: 3,
};

const defVerseData = {
  incorrect: 0,
  correct: 0,
  keys: [],
  timeTaken: 0,
  startTime: 0,
  currentVerse: 0,
  arrayPos: 0,
  finishedVerse: [],
  skips: 0,
};

const defSessionData = {
  incorrect: 0,
  correct: 0,
  versesCompleted: 0,
  verseData: [],
  keys: [],
  currentVerse: defVerseData,
  skips: 0,
};

const sessionDataReducer = (state, action) => {
  console.log('state changed by ' + action.type, {
    state,
    action,
  });
  switch (action.type) {
    case 'incorrect':
      return {
        ...state,
        keys: [
          ...state.keys,
          {
            correct: false,
            key: action.payload.key,
            time: action.payload.time,
          },
        ],
        currentVerse: {
          ...state.currentVerse,
          keys: [
            ...state.currentVerse.keys,
            {
              correct: false,
              key: action.payload.key,
              time: action.payload.time,
            },
          ],
          incorrect: state.currentVerse.incorrect + 1,
        },
        incorrect: state.incorrect + 1,
      };
    case 'correct':
      return {
        ...state,
        keys: [
          ...state.keys,
          {
            correct: true,
            key: action.payload.key,
            time: action.payload.time,
          },
        ],
        currentVerse: {
          ...state.currentVerse,
          keys: [
            ...state.currentVerse.keys,
            {
              correct: true,
              key: action.payload.key,
              time: action.payload.time,
            },
          ],
          correct: state.currentVerse.correct + 1,
          arrayPos: state.currentVerse.arrayPos + 1,
          finishedVerse: [
            ...state.currentVerse.finishedVerse,
            ...action.payload.ver,
          ],
        },
        correct: state.correct + 1,
      };
    case 'skip':
      return {
        ...state,
        keys: [
          ...state.keys,
          {
            correct: false,
            key: 'skip',
            time: action.payload.time,
          },
        ],
        currentVerse: {
          ...state.currentVerse,
          keys: [
            ...state.currentVerse.keys,
            {
              correct: false,
              key: 'skip',
              time: action.payload.time,
            },
          ],
          skips: state.currentVerse.skips + 1,
          arrayPos: state.currentVerse.arrayPos + 1,
          finishedVerse: [
            ...state.currentVerse.finishedVerse,
            ...action.payload.ver,
          ],
        },
        skips: state.skips + 1,
      };
    case 'verse Completed':
      return {
        ...state,
        versesCompleted: state.versesCompleted + 1,
        verseData: [
          ...state.verseData,
          {
            ...state.currentVerse,
            timeTaken: action.payload.time - state.currentVerse.startTime,
            ref: action.payload.ref,
            timeFinished: new Date(),
          },
        ],
        currentVerse: {
          ...defVerseData,
          startTime: action.payload.time,
          currentVerse: action.payload.incr
            ? 1 + state.currentVerse.currentVerse
            : state.currentVerse.currentVerse,
        },
      };
    case 'set ref':
      return {
        ...state,
        currentVerse: {
          ...state.currentVerse,
          ref: action.payload,
        },
      };
    case 'set prompt':
      return {
        ...state,
        currentVerse: {
          ...state.currentVerse,
          finishedVerse: action.payload.ver,
          arrayPos: action.payload.arrayPos,
        },
      };
    default:
      throw new Error();
  }
};

const TypingPage = ({ onEnd, log }) => {
  const season = useContext(SeasonContext);
  const chapters = useSelector((state) => state.typeQuizzing.chapters);
  const range = useSelector((state) => state.typeQuizzing.range);
  const rangeVal = useSelector((state) => state.typeQuizzing.rangeVal);
  const type = useSelector((state) => state.typeQuizzing.type);
  const prompt = useSelector((state) => state.typeQuizzing.prompt);
  const firstLetter = useSelector((state) => state.typeQuizzing.firstLetter);
  const justMemory = useSelector((state) => state.typeQuizzing.justMemory);
  const compete = useSelector((state) => state.typeQuizzing.compete);
  const endTime = 300; //useSelector((state) => state.typeQuizzing.endTime)
  const dispatch = useDispatch();
  const classes = usestyle();
  const [verses, setVerseO] = useVerses("typeQuizzing");
  const [prompSet, setPrompSet] = useState(false);
  const time = useTime();
  const [state, dispatch2] = useReducer(sessionDataReducer, defSessionData);

  const getUnfinishedVerse = (i) => {
    return firstLetter ? verses[i].intoWords : verses[i].intoChars;
  };
  const getPromptSize = () => {
    return prompt ? (firstLetter ? promptSizes.word : promptSizes.full) : 0;
  };

  const setPrompt = () => {
    if (verses.length !== 0 && !prompSet) {
      let a = [];
      if (firstLetter)
        a.push(verses[state.currentVerse.currentVerse].punctuation[0]);
      for (var i = 0; i < getPromptSize(); i++) {
        a.push(getUnfinishedVerse(state.currentVerse.currentVerse)[i]);
        if (firstLetter)
          a.push(verses[state.currentVerse.currentVerse].punctuation[i + 1]);
      }
      dispatch2({
        type: 'set prompt',
        payload: {
          ver: a,
          arrayPos: getPromptSize(),
        },
      });
      setPrompSet(true);
    }
  };

  const goToNextVerse = () => {
    setVerseO(state.currentVerse.currentVerse);
    dispatch2({
      type: 'verse Completed',
      payload: {
        time,
        ref: verses[state.currentVerse.currentVerse].ref,
        incr: typeQuizzingTypes[type].type === 'quote',
      },
    });
    dispatch2({
      type: 'set ref',
      payload: verses[state.currentVerse.currentVerse].ref,
    });
    setPrompSet(false);
  };

  useEffect(() => {
    setPrompt();
  }, [verses, prompSet]);

  useEffect(() => {
    if (!typeQuizzingTypes[type].countUp && endTime - time <= 0) {
      onEnd({
        ...state,
        compete,
        justMemory,
        time,
        endTime,
        range,
        chapters,
        rangeVal,
        type: typeQuizzingTypes[type].type,
        createdAt: new Date(),
      });
    }
    if (
      verses.length !== 0 &&
      state.currentVerse.currentVerse >= verses.length &&
      typeQuizzingTypes[type].countUp
    ) {
      onEnd({
        ...state,
        compete,
        justMemory,
        time,
        endTime,
        range,
        chapters,
        rangeVal,
        type: typeQuizzingTypes[type].type,
        createdAt: new Date(),
      });
    }
  }, [time, state.currentVerse.currentVerse, verses]);

  useKeydown((e) => {
    var ek = e.keyCode || e.which;
    var key = String.fromCharCode(ek);
    console.log(key, typeof key, key.length, key === ' ' || ek === 13);
    if (firstLetter) {
      if (
        verses[state.currentVerse.currentVerse].intoWords[
          state.currentVerse.arrayPos
        ]
          .substr(0, 1)
          .toLowerCase() === key.toLowerCase()
      ) {
        dispatch2({
          type: 'correct',
          payload: {
            key,
            time,
            ver: [
              verses[state.currentVerse.currentVerse].intoWords[
                state.currentVerse.arrayPos
              ],
              verses[state.currentVerse.currentVerse].punctuation[
                state.currentVerse.arrayPos + 1
              ],
            ],
          },
        });
        if (
          state.currentVerse.arrayPos ===
          verses[state.currentVerse.currentVerse].intoWords.length - 1
        ) {
          goToNextVerse();
        }
      } else if (key === ' ' || ek === 13) {
        dispatch2({
          type: 'skip',
          payload: {
            time,
            ver: [
              verses[state.currentVerse.currentVerse].intoWords[
                state.currentVerse.arrayPos
              ],
              verses[state.currentVerse.currentVerse].punctuation[
                state.currentVerse.arrayPos + 1
              ],
            ],
          },
        });
        if (
          state.currentVerse.arrayPos ===
          verses[state.currentVerse.currentVerse].intoWords.length - 1
        ) {
          goToNextVerse();
        }
      } else {
        dispatch2({
          type: 'incorrect',
          payload: {
            key,
            time,
          },
        });
      }
    }
    console.log(verses);
  });

  return (
    <>
      <VerseDisplay
        verse={state.currentVerse.finishedVerse /* || []*/}
        classes={classes}
        time={toMinSec(
          !typeQuizzingTypes[type].countUp ? endTime - time : time
        )}
        vref={
          verses[state.currentVerse.currentVerse]
            ? verses[state.currentVerse.currentVerse].ref
            : ''
        }
        score={calcTypeScore(state)}
      />{' '}
    </>
  );
};

export default TypingPage;
