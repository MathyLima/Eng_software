import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  Switch,
} from "@mui/material";
import axios from "axios"; // Importe o Axios

const ModalEditData = ({ data, onClose }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome_cliente: "",
    email_cliente: "",
    tell_1: "",
    tell_2: "",
    cpf: "",
    idade: "",
    endereco: "",
    cep: "",
    atual_vended: 0,
    is_lead: false,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        nome_cliente: data.nome_cliente || "",
        email_cliente: data.email_cliente || "",
        tell_1: data.tell_1 || "",
        tell_2: data.tell_2 || "",
        cpf: data.cpf || "",
        idade: data.idade || "",
        endereco: data.endereco || "",
        cep: data.cep || "",
        atual_vended: data.atual_vended || 0,
        is_lead: data.is_lead === 1, // Converte 1 para true, qualquer outro valor para false
      });

      setOpen(true);
    }
  }, [data]);

  const handleCancel = () => {
    setOpen(false);
    onClose();
  };

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    const requestData = {
      cpf: formData.cpf,
      nome: formData.nome_cliente,
      email: formData.email_cliente,
      telefone_1: formData.tell_1,
      telefone_2: formData.tell_2,
      idade: formData.idade,
      endereco: formData.endereco,
      cep: formData.cep,
      atual_vendedor: formData.atual_vended,
      is_lead: formData.is_lead ? 1 : 0,
    };

    axios
      .put(`http://localhost:3001/api/update_client/${data.id}`, requestData)
      .then((response) => {
        console.log("Cliente atualizado com sucesso!");
        setOpen(false);
        onClose();
      })
      .catch((error) => {
        console.error("Erro ao atualizar um cliente:", error);
        // Lide com o erro conforme necessário
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Cliente</DialogTitle>
      <DialogContent>
        <Box m="20px">
          <form onSubmit={handleSave}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(8, minmax(0, 1fr))"
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nome"
                value={formData.nome_cliente}
                onChange={handleFieldChange}
                name="nome_cliente"
                sx={{ gridColumn: "span 9" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                value={formData.email_cliente}
                onChange={handleFieldChange}
                name="email_cliente"
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Telefone 1"
                value={formData.tell_1}
                onChange={handleFieldChange}
                name="tell_1"
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Telefone 2"
                value={formData.tell_2}
                onChange={handleFieldChange}
                name="tell_2"
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="CPF"
                value={formData.cpf}
                onChange={handleFieldChange}
                name="cpf"
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Idade"
                value={formData.idade}
                onChange={handleFieldChange}
                name="idade"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Endereço"
                value={formData.endereco}
                onChange={handleFieldChange}
                name="endereco"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="CEP"
                value={formData.cep}
                onChange={handleFieldChange}
                name="cep"
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Atual Vendedor"
                value={formData.atual_vended}
                onChange={handleFieldChange}
                name="atual_vended"
                sx={{ gridColumn: "span 4" }}
              />
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
                  onChange={handleFieldChange}
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Salvar
              </Button>
            </Box>
          </form>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEditData;
