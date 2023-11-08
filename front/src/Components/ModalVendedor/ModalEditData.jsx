import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
} from "@mui/material";
import axios from "axios"; // Importe o axios se ainda não tiver importado.

const ModalEditVendedor = ({ data, onClose }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    cpf: "",
    senha: "",
    nome_vended: "",
    email_vended: "",
    tell_1: "",
    tell_2: "",
    endereco: "",
    cep: "",
  });

  useEffect(() => {
    // Atualize o estado do formulário com os dados do vendedor quando a prop "data" mudar
    if (data) {
      setFormData({
        cpf: data.cpf || "",
        senha: data.senha || "",
        nome_vended: data.nome_vended || "",
        email_vended: data.email_vended || "",
        tell_1: data.tell_1 || "",
        tell_2: data.tell_2 || "",
        endereco: data.endereco || "",
        cep: data.cep || "",
      });

      // Abra o modal quando os dados estiverem prontos
      setOpen(true);
    }
  }, [data]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Verifique se o valor de nome_vended não está vazio ou indefinido
    if (formData.nome_vended !== null && formData.nome_vended !== undefined) {
      // Execute a lógica de salvar os dados editados aqui
      // formData contém os dados atualizados

      axios
        .put(`http://localhost:3001/api/update_vendedor/${data.id}`, formData)
        .then((response) => {
          if (response.status === 200) {
            console.log("Vendedor atualizado com sucesso!");
            // Feche o modal de edição
            setOpen(false);
            onClose();
            // Você pode realizar outras ações necessárias, como atualizar a lista de vendedores
          } else {
            console.error("Erro ao atualizar o vendedor.");
            // Trate o erro ou forneça feedback ao usuário
          }
        })
        .catch((error) => {
          console.error("Erro ao atualizar o vendedor:", error);
          // Trate o erro ou forneça feedback ao usuário
        });
    } else {
      console.error("O campo 'nome_vended' não pode ser vazio ou nulo.");
      // Trate o erro ou forneça feedback ao usuário
    }
  };

  const handleCancel = () => {
    // Feche o modal de edição sem salvar
    setOpen(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Vendedor</DialogTitle>
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
                label="CPF"
                value={formData.cpf}
                onChange={handleFieldChange}
                name="cpf"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Senha"
                value={formData.senha}
                onChange={handleFieldChange}
                name="senha"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nome"
                value={formData.nome_vended}
                onChange={handleFieldChange}
                name="nome_vended"
                sx={{ gridColumn: "span 5" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                value={formData.email_vended}
                onChange={handleFieldChange}
                name="email_vended"
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Telefone 1"
                value={formData.tell_1}
                onChange={handleFieldChange}
                name="tell_1"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Telefone 2"
                value={formData.tell_2}
                onChange={handleFieldChange}
                name="tell_2"
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
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="CEP"
                value={formData.cep}
                onChange={handleFieldChange}
                name="cep"
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button onClick={handleSave} type="submit" color="secondary" variant="contained">
                Salvar
              </Button>
              <Button onClick={handleCancel} color="primary">
                Cancelar
              </Button>
            </Box>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ModalEditVendedor;
