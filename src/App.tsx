import { useEffect, useState } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { useInterval } from "./hooks/useInterval";
import { useDimensions } from "./hooks/useDimensions";
import { useMousePointer } from "./hooks/useMousePointer";
import { useIsOnline } from "./hooks/useIsOnline";
import { useFetch } from "./hooks/useFetch";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 400);
  const { width, height } = useDimensions();
  const position = useMousePointer();
  const isOnline = useIsOnline();
  const { todos } = useFetch(4);
  console.log(todos);

  useInterval(() => {
    console.log("hello world");
  }, 4000);

  useEffect(() => {
    //use debounced value to trigger an search api
    //like used in flipkart or amazon search bar
  }, []);

  return (
    <div>
      <div>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.description}</li>
        ))}
      </div>
      <br />
      {isOnline ? <div>status: online</div> : <div>status: offline</div>}
      <br />
      <div>window height: {height}</div>
      <div>window width: {width}</div>
      <br />
      <div>
        mouse position x:{position.x} y:{position.y}
      </div>
      <br />
      <div>search bar</div>
      <input
        type="text"
        placeholder="search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <br />
      <div>debouncedValue: {debouncedValue}</div>
    </div>
  );
};

export default App;
