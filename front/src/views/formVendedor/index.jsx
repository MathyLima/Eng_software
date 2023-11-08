import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Header from "../../Components/Header";
import axios from "axios";

const initialValues = {
  cpf: "",
  senha: "",
  nome: "",
  email: "",
  telefone_1: "",
  telefone_2: "",
  endereco: "",
  cep: "",
  atual_vendedor: "",
  idade: "",
};

const FormVendedor = () => {
  const [formData, setFormData] = useState(initialValues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/create_vendedor",
        formData
      );

      if (response.status === 200) {
        console.log("Registro criado com sucesso!");
        const emptyState = {};
        for (const key in formData) {
          emptyState[key] = "";
        }
        setFormData(emptyState);
      } else {
        console.error("Erro ao criar registro.");
      }
    } catch (error) {
      console.error("Erro ao criar registro:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a new User Profile" />

      <form onSubmit={handleSubmit}>
      <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(9, minmax(0, 1fr))"
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Nome"
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            value={formData.nome}
            name="nome"
            sx={{ gridColumn: "span 9" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            value={formData.email}
            name="email"
            sx={{ gridColumn: "span 3" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="CPF"
            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
            value={formData.cpf}
            name="cpf"
            sx={{ gridColumn: "span 3" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="password"
            label="Senha"
            onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
            value={formData.senha}
            name="senha"
            sx={{ gridColumn: "span 3" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Telefone 1"
            onChange={(e) => setFormData({ ...formData, telefone_1: e.target.value })}
            value={formData.telefone_1}
            name="telefone_1"
            sx={{ gridColumn: "span 1" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Telefone 2"
            onChange={(e) => setFormData({ ...formData, telefone_2: e.target.value })}
            value={formData.telefone_2}
            name="telefone_2"
            sx={{ gridColumn: "span 1" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Endereço"
            onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
            value={formData.endereco}
            name="endereco"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="CEP"
            onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
            value={formData.cep}
            name="cep"
            sx={{ gridColumn: "span 2" }}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
                Criar Vendedor
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default FormVendedor;
