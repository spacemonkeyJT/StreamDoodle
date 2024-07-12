import { useEffect } from "react";
import CommandProcessor from "./CommandProcessor"

function App() {
  const cp = CommandProcessor.inst;

  useEffect(() => cp.onCommand.subscribe((opts) => {
    console.log(opts.command);
  }));

  return <>
    Test
  </>
}

export default App
