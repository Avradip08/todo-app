import logo from './logo.svg';
import './App.css';

export default function App() {
  return (
    <>
      <addTodo></addTodo>  
    </>
  );
}


function addTodo() {
  return (
    <div class="container">
        <form onsubmit="handleSubmit(event)">
            <input type="text" id="title" placeholder="Title"></input>
            <br></br>
            <input type="text" id="description" placeholder="Description"></input>
            <br></br>
            <button>Submit</button>
        </form>
    </div>
  );
}

function listTodos() {
  
}
