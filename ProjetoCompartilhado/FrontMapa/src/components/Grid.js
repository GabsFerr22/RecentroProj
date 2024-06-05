import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "react-modal";
import Form from "./Form.js";
import "../style/Crud.css";

export const Thead = styled.thead``;
export const Tbody = styled.tbody``;
export const Tr = styled.tr``;
export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;
export const Td = styled.td`
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const PaginationContainer = styled.nav`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const PaginationList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
`;
const PaginationItem = styled.li`
  margin: 0 5px;
`;
const PaginationLink = styled.button`
  background-color: #fff;
  border: 1px solid #ccc;
  color: #333;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }

  &.active {
    background-color: #007bff;
    color: #fff;
    border-color: #007bff;
  }
`;

const Grid = () => {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalConfirmacao, setModalConfirmacao] = useState(false); 
  const [idToDelete, setIdToDelete] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/`, {
        params: { page: currentPage, limit: usersPerPage }
      });
      setUsers(res.data.data);
      setTotalUsers(res.data.total);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, usersPerPage]);

  const handleEdit = (item) => {
    setOnEdit(item);
    setModalAberto(true);
  };

  const handleDelete = async (idpredio) => {
    setModalConfirmacao(true); 
    setIdToDelete(idpredio); 
  };

  const confirmDelete = async () => {
    try {
      const { data } = await axios.delete(`http://localhost:8800/${idToDelete}`);
      toast.success(data);
      setUsers(users.filter((user) => user.idpredio !== idToDelete));
    } catch ({ response }) {
      toast.error(response.data);
    }

    setModalConfirmacao(false); 
    fetchUsers();
  };

  const cancelDelete = () => {
    setModalConfirmacao(false); 
    setIdToDelete(null); 
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const modalFechado = () => {
    setModalAberto(false);
    setOnEdit(null);
  };

  return (
    <div>
      <table className="table">
        <thead className="thead">
          <tr>
            <Th>Bairro</Th>
            <Th>Tipo</Th>
            <Th className="onlyWeb">Endereço</Th>
            <Th>Coordenadas</Th>
          </tr>
        </thead>
        <tbody className="tbody">
          {users.map((item, i) => (
            <Tr key={i}>
              <Td width="30%">{item.bairro}</Td>
              <Td width="30%">{item.tipo}</Td>
              <Td width="20%" className="onlyWeb">{item.endereco}</Td>
              <Td width="30%">{item.coordenada}</Td>
              <Td align="center" width="10%">
                <FaEdit onClick={() => handleEdit(item)} />
                <FaTrash onClick={() => handleDelete(item.idpredio)} />
              </Td>
            </Tr>
          ))}
        </tbody>
      </table>

      <PaginationContainer>
        <PaginationList>
          {usersPerPage !== null && totalUsers > usersPerPage && (
            <Pagination
              currentPage={currentPage}
              usersPerPage={usersPerPage}
              totalUsers={totalUsers}
              paginate={paginate}
            />
          )}
        </PaginationList>
      </PaginationContainer>

      <Modal
        isOpen={modalAberto}
        onRequestClose={modalFechado}
        contentLabel="Editar Moradia"
        ariaHideApp={false}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-container">
          <h2>Editar Moradia</h2>
          <Form
            getUsers={() => {
              modalFechado();
              fetchUsers();
            }}
            onEdit={onEdit}
            setUsers={setUsers}
            users={users}
          />
          <div className="modal-buttons-container">
            <button className="cancel-button" onClick={modalFechado}>
              Fechar
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalConfirmacao}
        onRequestClose={cancelDelete}
        contentLabel="Confirmar exclusão"
        ariaHideApp={false}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-container">
          <h2>Confirmar Exclusão</h2>
          <p>Deseja realmente excluir este item?</p>
          <div className="modal-buttons-container">
            <button className="confirm-button" onClick={confirmDelete}>
              Confirmar
            </button>
            <button className="cancel-button" onClick={cancelDelete}>
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const Pagination = ({ currentPage, usersPerPage, totalUsers, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {pageNumbers.map((number) => (
        <PaginationItem key={number}>
          <PaginationLink
            onClick={() => paginate(number)}
            className={currentPage === number ? "active" : ""}
          >
            {number}
          </PaginationLink>
        </PaginationItem>
      ))}
    </>
  );
};

export default Grid;
