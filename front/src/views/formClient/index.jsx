import { Box, Button, TextField, Switch } from "@mui/material";
import React, { useState } from "react";
import Header from "../../Components/Header";
import axios from "axios";

const initialValues = {
  nome: "",
  email: "",
  telefone_1: 0,
  telefone_2: 0,
  cpf: "",
  idade: "",
  endereco: "",
  cep: "",
  atual_vendedor: 0,
  is_lead: false, // Added is_lead field with default value as false
};

const Form = () => {
  const [formData, setFormData] = useState(initialValues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // Converter o valor booleano de isLead para 0 ou 1
    const formDataToSend = {
      ...formData,
      is_lead: formData.isLead ? 1 : 0,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/create_client",
        formDataToSend
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
          gridTemplateColumns="repeat(8, minmax(0, 1fr)"
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Nome"
            onChange={(e) =>
              setFormData({ ...formData, nome: e.target.value })
            }
            value={formData.nome}
            name="nome"
            sx={{ gridColumn: "span 9" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            value={formData.email}
            name="email"
            sx={{ gridColumn: "span 3" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Telefone 1"
            onChange={(e) =>
              setFormData({ ...formData, telefone_1: e.target.value })
            }
            value={formData.telefone_1}
            name="telefone_1"
            sx={{ gridColumn: "span 3" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Telefone 2"
            onChange={(e) =>
              setFormData({ ...formData, telefone_2: e.target.value })
            }
            value={formData.telefone_2}
            name="telefone_2"
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
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Idade"
            onChange={(e) =>
              setFormData({ ...formData, idade: e.target.value })
            }
            value={formData.idade}
            name="idade"
            sx={{ gridColumn: "span 1" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Endereço"
            onChange={(e) =>
              setFormData({ ...formData, endereco: e.target.value })
            }
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
            sx={{ gridColumn: "span 3" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Atual Vendedor"
            onChange={(e) =>
              setFormData({ ...formData, atual_vendedor: e.target.value })
            }
            value={formData.atual_vendedor}
            name="atual_vendedor"
            sx={{ gridColumn: "span 2" }}
          />
          {/* Add a Switch for 'is_lead' */}
          <Box
            sx={{ gridColumn: "span 1" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            
          >
            <label>Is Lead:</label>
            <Switch
              name="is_lead"
              color="secondary"
              checked={formData.is_lead}
              onChange={(e) =>
                setFormData({ ...formData, is_lead: e.target.checked })
              }
            />
          </Box>
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

export default Form;
