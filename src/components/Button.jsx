function Button({ dispatch, answer, currentQues, numQuestions }) {
  if (answer === null) return null;
  if (currentQues < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "nextQuestion" });
        }}
      >
        Next
      </button>
    );
  }
  if (currentQues === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "finished" });
        }}
      >
        Finish
      </button>
    );
  }
}

export default Button;
