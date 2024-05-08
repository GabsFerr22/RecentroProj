import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
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
  padding-top: 15px;
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
  const [setOnEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800");
        setUsers(res.data.sort((a, b) => (a.bairro > b.bairro ? 1 : -1)));
      } catch (error) {
        toast.error(error);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (idpredio) => {
    await axios
      .delete("http://localhost:8800/" + idpredio)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.idpredio !== idpredio);

        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <table className="table">
        <thead className="thead">
          <tr>
            <th>Bairro</th>
            <th>Tipo</th>
            <th className="onlyWeb">Endereço</th>
            <th>Coordenadas</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {currentUsers.map((item, i) => (
            <tr key={i}>
              <Td width="30%">{item.bairro}</Td>
              <Td width="30%">{item.tipo}</Td>
              <Td width="20%" className="onlyWeb">{item.endereco}</Td>
              <Td width="30%">{item.coordenada}</Td>
              <Td align="center" width="10%">
                <FaEdit onClick={() => handleEdit(item)} />
                <FaTrash onClick={() => handleDelete(item.idpredio)} />
              </Td>
            </tr>
          ))}
        </tbody>
      </table>

      <PaginationContainer>
        <PaginationList>
          {usersPerPage !== null && users.length > usersPerPage && (
            <Pagination
              currentPage={currentPage}
              usersPerPage={usersPerPage}
              totalUsers={users.length}
              paginate={paginate}
            />
          )}
        </PaginationList>
      </PaginationContainer>
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
