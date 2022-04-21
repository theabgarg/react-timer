import React, { useState, useEffect, useRef } from "react";
import Button from "./components/Button";
import Input from "./components/Input";

const Form = () => {
  //input, start, pause/resume, reset
  const [inputValue, setInputValue] = useState({
    minutes: 0,
    seconds: 0,
  });
  const [displayValue, setDisplayValue] = useState({
    minutes: 0,
    seconds: 0,
  });
  const [pause, setPause] = useState(false);
  const [preRender, setPreRender] = useState(true);

  let timeRef = useRef(0);

  let ReducingInterval = useRef();

  const reducingFunction = (seconds) => {
    if (seconds > 0) return seconds - 1;
    return seconds;
  };

  const startFunction = () => {
    clearInterval(ReducingInterval.current);
    if (pause) {
      setPause(false);
    } else {
      timeRef.current = inputValue.minutes * 60 + inputValue.seconds * 1;
    }

    ReducingInterval.current = setInterval(() => {
      let second = timeRef.current;
      timeRef.current = reducingFunction(second);
      setDisplayValue((pre) => {
        let mm = parseInt(timeRef.current / 60);
        let ss = parseInt(timeRef.current % 60);
        if (mm < 10) mm = "0" + mm;
        if (ss < 10) ss = "0" + ss;
        return {
          minutes: mm,
          seconds: ss,
        };
      });
    }, 1000);
  };

  const pauseFunction = () => {
    setPause((pre) => !pre);

    if (!pause) {
      console.log("pause function clicked");

      clearInterval(ReducingInterval.current);
    } else {
      startFunction();
    }
  };
  const reset = () => {
    timeRef.current = inputValue.minutes * 60 + inputValue.seconds * 1;
    setDisplayValue((pre) => {
      let mm = parseInt(timeRef.current / 60);
      let ss = parseInt(timeRef.current % 60);
      if (mm < 10) mm = "0" + mm;
      if (ss < 10) ss = "0" + ss;
      return {
        minutes: mm,
        seconds: ss,
      };
    });
  };

  const onChangeFn = (e, type) => {
    if (e.target.value >= 0) {
      setInputValue((pre) => ({ ...pre, [type]: e.target.value }));
    }
  };

  return (
    <div>
      <Input
        type="number"
        inputValue={inputValue.minutes}
        label={"minutes"}
        onChangeFunction={(e) => onChangeFn(e, "minutes")}
      />
      <Input
        type="number"
        inputValue={inputValue.seconds}
        label={"seconds"}
        onChangeFunction={(e) => onChangeFn(e, "seconds")}
      />
      <Button name="start" clickFunction={() => startFunction()} />
      <Button name="pause/resume" clickFunction={() => pauseFunction()} />
      <Button name="reset" clickFunction={() => reset()} />
      <div>
        {displayValue.minutes ? displayValue.minutes : "00"}:
        {displayValue.seconds ? displayValue.seconds : "00"}
      </div>
    </div>
  );
};

export default Form;
