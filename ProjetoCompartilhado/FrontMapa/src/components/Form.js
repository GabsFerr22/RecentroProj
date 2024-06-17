import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Papa from "papaparse";
import axios from "axios";
import "../style/Crud.css";

const Form = ({ getLocations, onEdit }) => { 
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      user.bairro.value = onEdit.bairro;
      user.tipo.value = onEdit.tipo;
      user.endereco.value = onEdit.endereco;
      user.coordenada.value = onEdit.coordenada;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = ref.current;

    if (!user.bairro.value || !user.tipo.value || !user.endereco.value || !user.coordenada.value) {
      return toast.warn("Preencha todos os campos!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: "Bounce",
      });
    }

    const coordenadas = `[${user.coordenada.value}]`;

    try {
      if (onEdit) {
        await axios.put(`http://localhost:8800/${onEdit.idpredio}`, {
          bairro: user.bairro.value,
          tipo: user.tipo.value,
          endereco: user.endereco.value,
          coordenada: coordenadas,
        });
      } else {
        await axios.post("http://localhost:8800", {
          bairro: user.bairro.value,
          tipo: user.tipo.value,
          endereco: user.endereco.value,
          coordenada: coordenadas,
        });
      }
      toast.success("Operação realizada com sucesso!");
    } catch (error) {
      toast.error("Erro ao realizar a operação!");
    }

    user.bairro.value = "";
    user.tipo.value = "";
    user.endereco.value = "";
    user.coordenada.value = "";

    getLocations(); 
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (result) => {
        const newData = result.data
          .filter((row) => row.Bairro && row.Tipo && row.Endereco && row.Coordenada)
          .map((row) => ({
            bairro: row.Bairro,
            tipo: row.Tipo,
            endereco: row.Endereco,
            coordenada: `[${row.Coordenada}]`,
          }));

        for (const data of newData) {
          try {
            await axios.post("http://localhost:8800", data);
            toast.success("Dados carregados com sucesso!");
          } catch (error) {
            toast.error("Erro ao carregar os dados!");
          }
        }
      },
    });
  };

  return (
    <form className="formContainer" ref={ref} onSubmit={handleSubmit}>
      <div className="inputArea">
        <label>Bairro</label>
        <input name="bairro" />
      </div>
      <div className="inputArea">
        <label>Tipo</label>
        <input name="tipo" />
      </div>
      <div className="inputArea">
        <label>Endereço</label>
        <input name="endereco" />
      </div>
      <div className="inputArea">
        <label>Coordenadas</label>
        <input name="coordenada" />
      </div>
      <div>
        <label htmlFor="csv" className="LabelCsv">CSV</label>
        <input name="csv" type="file" id="csv" accept=".csv" onChange={handleFileChange} />
      </div>
      <button type="submit" className="submitButton">ENVIAR</button>
    </form>
  );
};

export default Form;
