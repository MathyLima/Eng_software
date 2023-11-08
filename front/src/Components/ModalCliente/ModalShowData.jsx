import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

const ModalShowData = ({ open, data, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Detalhes do Cliente</DialogTitle>
      <DialogContent>
        {data && (
          <Box>
            <Typography>ID: {data.id}</Typography>
            <Typography>Nome: {data.nome_cliente}</Typography>
            {/* Adicione mais detalhes do cliente conforme necessário */}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalShowData;
