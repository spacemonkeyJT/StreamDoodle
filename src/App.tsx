import { Overlay, Task } from "./Overlay";

function App() {
  // const params = new URL(location.href).searchParams;
  // const clientID = params.get('c');
  // const authToken = params.get('t');
  const tasks: Task[] = [{
    id: 1,
    name: 'Do something',
    username: 'SpaceMonkeyJT',
    addedDate: Date.now(),
  }];
  return <Overlay tasks={tasks} />
}

export default App
