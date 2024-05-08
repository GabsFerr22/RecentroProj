import "../style/Crud.css";
import Form from "../components/Form.js";
import Grid from "../components/Grid.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


function Crud() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      console.log(res.data);
      setUsers(res.data.sort((a, b) => (a.bairro > b.bairro ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
    <div className="body">
      <div className="container">
        <h2 className="title">MORADIAS</h2>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
      </div>
    </div>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  );
}

export default Crud;
