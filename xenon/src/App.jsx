import { useEffect, useState } from 'react'
import './App.css'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
  useNavigate,
  Link,
  BrowserRouter
} from "react-router-dom";

function App() {  

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/task/add">Add Task</Link>
        <Link to="/task/delete/:id">delete Task</Link>
        <Link to="/task/update/:id">Update Task</Link>
      </nav>
      
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/task/:id" element={<ListData />} />
      <Route path="/task/add" element={<Fatch_Post />} /> 
      <Route path="/task/delete/:id" element={<DeleteTask/>}/> 
      <Route path="/task/update/:id" element={<UpdateTask/>} />  
    </Routes>
    </BrowserRouter>
  )
}

export default App


const UpdateTask = () => {
  const { id } = useParams();
  const [data, setData] = useState({ title: "", description: "", dueDate: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the task data with the given id and update the state
    fetch(`http://localhost:8080/tasks/${id}`)
      .then(res => res.json())
      .then(taskData => setData(taskData))
      .catch(error => console.error(error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/tasks/${id}`, {
      method: 'PUT',
     
      body: JSON.stringify(data),
    })
      .then(() => navigate("/"))
      .catch(error => console.error(error));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" name="title" value={data.title} onChange={handleChange} />
        <label>Description</label>
        <input type="text" name="description" value={data.description} onChange={handleChange} />
        <label>Due Date</label>
        <input type="date" name="dueDate" value={data.dueDate} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

const DeleteTask = () => {
  const navigate= useNavigate();
  let {id} = useParams();
  useEffect(() => {
    fetch(`http://localhost:8080/tasks/${id}`,{method:'DELETE'})
      .then(res => res.json())
      .then(data=>{ alert(data.message)
      navigate(
        "/"
      )}
      ).catch(error => console.error(error));
  }, [id]);

  return (<h1>delete tasks</h1>);
}


  



const Home= ()=>{

  const [count, setCount] = useState(0);
  const [task,setTask]= useState([]);


  useEffect(
    ()=>{
      fetch('http://localhost:8080/tasks')
      .then(results => results.json())
      .then(data => {
        setTask(data)
    });
    }  

    
   ,[])

   return(
  
  <>

  <h1> list of tasks</h1>

  {
   task.length>0 && (

     task.map((item)=>{
       return(
         <div>
          <Link to={"/task/delete/"+item.id}><h2>{item.id}</h2> </Link>
           <h2>{item.title}</h2>
           <p>{item.description}</p>
           <p>{item.dueDate}</p>
           {/* <DeleteTask/> */}
         </div>
       )
     }
   ))
  }

 </>)
}


const ListData= ()=>{
  const [task,setTask]= useState(null);
  let { id } = useParams();

  

  useEffect(
    ()=>{
      fetch(`http://localhost:8080/tasks/${id}`)
      .then(results => results.json())
      .then(data => {
        setTask(data)
    });
    }

   ,[id])
  return(
    <>
     <h1>for single page</h1>
     {
   task && (

     
    
         <div>
         
           <h2>{task.title}</h2>
           <p>{task.description}</p>
           <p>{task.dueDate}</p>
          
         </div> 
       
     
   )}
  
    </>


  )
}


 const Fatch_Post = () => {
  const [data,setData]= useState({title:"",description:"",dueDate:""});
  const navigate = useNavigate();
  const handleSubmit = (e)=> {

    e.preventDefault();
        fetch('http://localhost:8080/tasks',
        { method: 'POST',
         body:JSON.stringify(data),
        })
        navigate("/");

      }
     
  const handleChange = (e) => {
    const {name,value} = e.target;
    setData({...data,[name]:value});
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" name="title" onChange={handleChange} />
        <label>Description</label>
        <input type="text" name="description" onChange={handleChange} />
        <label>Due Date</label>
        <input type="date" name="dueDate" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
 }