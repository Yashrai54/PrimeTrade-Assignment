import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ApiContext } from "../../context/ApiContext";

const Home = () => {
  const { baseUrl } = useContext(ApiContext);
  const [tasks, setTasks] = useState([]);
  const [newTitle,setNewTitle]=useState(null)
  const [editingId, setEditingId] = useState(null);   


  useEffect(() => {
    axios.get(`${baseUrl}/tasks`, { withCredentials: true })
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleEdit = (task) => {
    setEditingId(task._id);
    setNewTitle(task.title);
  };

  async function handleUpdate(id){
    try{
    const updated=await axios.put( `${baseUrl}/tasks/${id}`,{title:newTitle},{withCredentials:true})
     setTasks(tasks.map(task => task._id === id ? updated.data : task));
      setEditingId(null);
      setNewTitle("");
    }
    catch(error){
        console.error(error)
    }
  }
  async function  handleDelete(id) {
    try {
        await axios.delete(`${baseUrl}/tasks/${id}`,{withCredentials:true})
        setTasks(tasks.filter(task=>task._id!==id))
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <div class="dashboard">
    <div class="dashboard-container">
      <h1>Tasks</h1>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
          {editingId === task._id ? (
              <>
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <button onClick={() => handleUpdate(task._id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {task.title}
                <button onClick={() => handleEdit(task)}>Edit</button>
              </>
            )}
          <button onClick={()=>handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Home;
