import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Button from "./Button";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Footer from "./Footer";
import Timer from "./Timer";
const initialState = {
  questions: [],
  //'loading , 'error' ,'ready ,'active',finished
  status: "loading",
  currentQues: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secendsRemaining: null,
};
const SECS_PER_QUESTION = 30;
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        secendsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const curQuest = state.questions.at(state.currentQues);
      return {
        ...state,
        answer: action.payload,
        points:
          curQuest.correctOption === action.payload
            ? state.points + curQuest.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        currentQues: state.currentQues + 1,
        answer: null,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...state,
        status: "active",
        currentQues: 0,
        answer: null,
        points: 0,
        secendsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "tick":
      return {
        ...state,
        secendsRemaining: state.secendsRemaining - 1,
        status: state.secendsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action is unknown ");
  }
}

export default function App() {
  const [
    {
      status,
      questions,
      currentQues,
      answer,
      points,
      highScore,
      secendsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((acc, v) => {
    return acc + v.points;
  }, 0);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={currentQues}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              dispatch={dispatch}
              answer={answer}
              question={questions[currentQues]}
            />
            <Footer>
              <Timer dispatch={dispatch} secendsRemaining={secendsRemaining} />
              <Button
                answer={answer}
                dispatch={dispatch}
                currentQues={currentQues}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            dispatch={dispatch}
            highScore={highScore}
            points={points}
            maxPoints={maxPoints}
            numQuestions={numQuestions}
          />
        )}
      </Main>
    </div>
  );
}
