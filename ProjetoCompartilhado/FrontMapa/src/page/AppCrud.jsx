import "../style/Crud.css";
import Form from "../components/Form.js";
import Grid from "../components/Grid.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Crud() {
  const navigate = useNavigate(); 
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getLocations = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      console.log(res.data);
      setUsers(res.data.sort((a, b) => (a.bairro > b.bairro ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getLocations();
  }, [setUsers]);

  const handleGoBack = () => {
    navigate('/Login');
  };

  return (
    <>
    <div className="body">
      <div className="container">
        <div className="top-left-button" onClick={handleGoBack}>
          <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
        </div>
        <h2 className="title">MORADIAS</h2>
        <Form onEdit={onEdit} getLocations={getLocations} /> 
        <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
      </div>
    </div>
    <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  );
}

export default Crud;
