import React, { useState } from 'react';
import { Container, Box, Button, Typography, TextField,Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';


export default function App() {
  const [todos, setTodos] = useState([]);

  React.useEffect(() => {
    getTodos();
  }, []);
  
  function getTodos(){
    fetch("https://todo-backend-service-j4x3.onrender.com/todos", {
      method: "GET"
    }).then((response) => {
      response.json().then((data) => {
        setTodos(data);
      })
    });
  }
  function addTodo(title,description) {
    fetch("https://todo-backend-service-j4x3.onrender.com/todos", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          description: description
        }),
        headers: {
           "Content-Type": "application/json"
        }
    }).then((response)=>{
      getTodos();
    })
  }

  function updateTodo(id,title,description) {
    fetch(
      `https://todo-backend-service-j4x3.onrender.com/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        description: description
      }),
      headers: {
          "Content-Type": "application/json"
      }
    }).then((response)=>{
      getTodos();
    })
  }

  function deleteTodo(id) {
    fetch(
      `https://todo-backend-service-j4x3.onrender.com/todos/${id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      }
    }).then((response)=>{
      getTodos();
    })
  }
  return (
    <div>
      <Container> 
      <Box 
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="flex-start"
        gap={4}
        py={2}
        >
      <Form onCreate={addTodo}></Form>
      </Box>
      </Container>
      <Container> 
      <Box 
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="flex-start"
        gap={4}
        py={2}
        >
        {todos.map((todo)=>{
          return(
          <TodosList key={parseInt(todo.id)} id={parseInt(todo.id)} todoContent={todo} onUpdate={updateTodo} onDelete={deleteTodo}></TodosList>
          )
        })}
        </Box>
      </Container>
    </div>
  );
}



function Form({onCreate}){
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');

  const handleSubmit = (e) =>{
    e.preventDefault();
    onCreate(title,description);
    setTitle('');
    setDescription('');
  };

  const StyledTypography = styled(Typography)({
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '2.5rem',
    color: '#ffffff',
    padding: '1rem',
    background: '#6200EE',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  });
  return (
      <form onSubmit={handleSubmit}>
        <Container maxWidth="sm">
          <StyledTypography variant="h4" component="h1" gutterBottom>
            Create Todo
          </StyledTypography>
        </Container>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />
        <Button  type="submit" variant="contained" color="primary" >
          Add
        </Button>
      </form>
  )
}


function TodosList({id,todoContent,onUpdate,onDelete}){
  function handleDelete(id){
    onDelete(id)
  }
  function handleEdit(id,title,description){
    onUpdate(id,title,description)
  }
  return (
    <CardComponent id={id} todoTtitle={todoContent.title} todoDdescription={todoContent.description} onDelete={handleDelete} onUpdate={handleEdit}></CardComponent>
  )
}

function CardComponent({ id, todoTtitle, todoDdescription, onDelete, onUpdate }) {
  
  const [title, setTitle] = useState(todoTtitle);
  const [description, setDescription] = useState(todoDdescription);
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit(){
    setIsEditing(true);
  };

  function handleSave(id){
    setIsEditing(false);
    onUpdate(id,title,description);
  };

  function handleDelete(id){
    onDelete(id);
  }
  return (
    
      
    <Card>
    <CardContent>
      {isEditing ? (
        <>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </>
      ) : (
        <>
          <Typography variant="h5" component="h2" 
          style={{
            maxWidth: '200px', // Set the maximum width for wrapping
            wordWrap: 'break-word', // Enable word wrapping
          }}>
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" 
          style={{
            maxWidth: '200px', // Set the maximum width for wrapping
            wordWrap: 'break-word', // Enable word wrapping
          }}>
            {description}
          </Typography>
        </>
      )}
    </CardContent>
    <CardContent>
      {isEditing ? (
        <Button variant="contained" color="primary" onClick={()=>handleSave(id)}>
          <SaveIcon/>
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={handleEdit}>
          <EditIcon/>
        </Button>
      )}
      <Button variant="contained" color="secondary" onClick={()=>handleDelete(id)}>
        <DeleteIcon/>
      </Button>
    </CardContent>
  </Card>
        
  );
}


