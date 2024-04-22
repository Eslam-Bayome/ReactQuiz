import { useEffect } from "react";

function Timer({ dispatch, secendsRemaining }) {
  const mins = Math.floor(secendsRemaining / 60);
  const secs = secendsRemaining % 60;
  useEffect(() => {
    let theTimer = setInterval(function () {
      dispatch({ type: "tick" });
    }, 1000);
    return () => {
      clearInterval(theTimer);
    };
  }, [dispatch]);
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </div>
  );
}

export default Timer;
