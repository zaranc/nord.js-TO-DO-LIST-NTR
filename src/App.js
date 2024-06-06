import { useEffect } from "react";
import TodoList from "./componant/TodoList";
import { useDispatch } from "react-redux";
import { fetchdata } from "./Toolkit/Slice/todoSlice";


function App() {

  let dispatch = useDispatch();

  useEffect(() => {

    dispatch(fetchdata({ endpoint: "gettask" }))
    // dispatch(fetchdata({ endpoint: "gettaskstatuscomplete" }));
    // dispatch(fetchdata({ endpoint: "gettaskstatusuncomplete" }));


  }, [])



  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default App;
