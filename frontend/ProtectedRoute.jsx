import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ApiContext } from "./context/ApiContext";
import { useContext } from "react";


const ProtectedRoute = ({children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
    const baseUrl=useContext(ApiContext)
  useEffect(() => {
    axios.get(`${baseUrl}/tasks`, { withCredentials: true })
      .then(() => setLoading(false))      
      .catch(() => navigate("/signin"));  
  }, []);

  if (loading) return <div>Loading...</div>;
  return children;
};

export default ProtectedRoute;
