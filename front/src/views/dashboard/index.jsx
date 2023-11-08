import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import Header from "../../Components/Header";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import LineChart from "../../Components/Charts/LineChart";
import PieChart from "../../Components/Charts/PieChart";
import GeographyChart from "../../Components/Charts/GeographyChart";
import BarChart from "../../Components/Charts/BarChart";
import ProgressCircle from "../../Components/ProgessCircle";
import StatBox from "../../Components/StatBox";
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';

// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";

import { getFullData } from "../../utils/fulldata";

import { Impressao } from './impressao';


function processData(data){
    const vendas_mesAnt = data.total_vendas_mes_anterior
    const vendas_mesAtual = data.total_vendas_mes_atual

    const diferencaVendas = vendas_mesAtual - vendas_mesAnt
    const diferencaPercentual = ((vendas_mesAnt - vendas_mesAtual) / vendas_mesAnt )*100
    const sinal = diferencaPercentual >= 0 ? '-' : '+';
    const diferencaPercentualComSinal = `${sinal}${Math.abs(diferencaPercentual)}%`;


    const generoMaisVendido = data.genero_mais_vendido.genero
    const quantidadeGeneroMaisVendido = data.genero_mais_vendido.quantidade
    
    const valoresVendas ={
      vendas_mesAtual,
      vendas_mesAnt,
      diferencaAbsoluta: diferencaVendas,
      diferencaPercentual: diferencaPercentualComSinal
    }

    const top1_genero = {
      nome:generoMaisVendido,
      quantidade: quantidadeGeneroMaisVendido
    }

    const dados={
      valoresVendas,
      top1_genero,
      
    }


    return dados

}


const Dashboard = () => {
  const themes = useTheme();
  const colors = tokens(themes.palette.mode);

  // const [data, setData] = useState([]);

  // // const visualizarImpressao = () => {
  // //   const classeImpressao = new Impressao(data);
  // //   const documento = classeImpressao.gerarDocumento();
  // //   pdfMake.createPdf(documento).open({}, window.open('', '_blank'));
  // // }

  
  //   useEffect(() => {
  //       async function fetchData() {
  //           try {
  //               const result = await getFullData("dashboard");
  //               setData(result);
  //               console.log(result)
  //           } catch (error) {
  //               console.error(error);
  //           }
  //       }

  //       fetchData();
  //   }, []);
    const dados_teste = {
      "total_vendas_mes_anterior": 2000,
      "total_vendas_mes_atual": 1500,
      "genero_mais_vendido": {
        "genero": "Ficção",
        "quantidade": 500
      },
      "clientes_is_flamengo": 5, // Total de clientes que são fãs do Flamengo
      "clientes_watch_onepiece": 3, // Total de clientes que assistem a One Piece
      "clientes_total": 20, // Total de clientes no total
      "bairro_genero": [
        { "genero": "genero A", "quantidade": 100, "bairro": "Bairro X" },
        { "genero": "genero B", "quantidade": 200, "bairro": "Bairro X" },
        { "genero": "genero C", "quantidade": 150, "bairro": "Bairro X" },
        { "genero": "genero A", "quantidade": 80, "bairro": "Bairro Y" },
        { "genero": "genero B", "quantidade": 120, "bairro": "Bairro Y" },
        { "genero": "genero C", "quantidade": 60, "bairro": "Bairro Y" },
        { "genero": "genero A", "quantidade": 50, "bairro": "Bairro Z" },
        { "genero": "genero B", "quantidade": 70, "bairro": "Bairro Z" },
        { "genero": "genero C", "quantidade": 90, "bairro": "Bairro Z" }
      ],
      "genero": [
        { "genero": "Ficção", "quantidade": 500 },
        { "genero": "Não Ficção", "quantidade": 300 },
        { "genero": "Fantasia", "quantidade": 200 }
      ],
      "livros_mais_vendidos": [
        { "livro": "Livro D", "quantidade": 300 },
        { "livro": "Livro E", "quantidade": 250 },
        { "livro": "Livro F", "quantidade": 200 }
      ],
      "genero_mais_vendidos": [
        { "livro": "Ficção", "quantidade": 500 },
        { "livro": "Não Ficção", "quantidade": 300 },
        { "livro": "Fantasia", "quantidade": 200 }
      ]
    }
    const dadosProcessados = processData(dados_teste)

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your Dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            
          >
            {/* onClick={visualizarImpressao} */}
            <DownloadOutlinedIcon  sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12,1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`R$ ${dadosProcessados.valoresVendas.vendas_mesAtual}`}
            subtitle="Total vendas Mês atual"
            progress={dadosProcessados.valoresVendas.diferencaPercentual}
            increase={dadosProcessados.valoresVendas.diferencaAbsoluta}
            icon={
              <AttachMoneyOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`R$ ${dadosProcessados.valoresVendas.diferencaAbsoluta}`}
            subtitle="Flutuações de Vendas"
            progress={dadosProcessados.valoresVendas.diferencaPercentual}
            increase={dadosProcessados.valoresVendas.diferencaPercentual}
            icon={
              <PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={dadosProcessados.top1_genero.nome}
            subtitle="Gênero mais popular"
            progress="100"
            increase={dadosProcessados.top1_genero.quantidade}
            icon={
              <BookOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Inbound"
            progress="0.75"
            increase="+14%"
            icon={
              <PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
            }
          />
        </Box>
        {/* ROW 2 */}
        <Box gridColumn="span 8" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                Revenue Generated
              </Typography>
              <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                $59,342,32
              </Typography>
            </Box>

            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>

          <Box height="250px" mt="-20px">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        {/* TRANSACTIONS */}
        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} overflow="auto">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            color={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Livros mais vendidos
            </Typography>
          </Box>

          {dados_teste.livros_mais_vendidos.map((transaction, i) => (
            <Box
              key={`${transaction.livro}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
                  {transaction.livro}
                </Typography>

                {/* <Typography color={colors.greenAccent[100]}>
                  {transaction.quantidade}
                </Typography> */}
              </Box>
              <Box display="flex"  justifyContent="space-between" alignItems="center"  color={colors.grey[100]}>Quantidade:
              <Box color={colors.grey[900]} backgroundColor={colors.greenAccent[500]} ml="10px" p="5px 10px" borderRadius="4px">
                {transaction.quantidade}
              </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} p="30px">
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box height="300px" mt="-20px">         
           <PieChart
                  clientesTotal={dados_teste.clientes_total}
                  clientesIsFlamengo={dados_teste.clientes_is_flamengo}
                  clientesWatchOnePiece={dados_teste.clientes_watch_onepiece}
                />
            {/* <Typography variant="h5" color={colors.greenAccent[500]} sx={{ mt: "15px" }}>
              $48,352 revenue Generated
            </Typography>
            <Typography variant="h5" fontWeight="600">
              Includes Extra misx expenditures and costs
            </Typography> */}
          </Box>
        </Box>
        {/*  */}
        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Typography variant="h5" fontWeight="600" sx={{ p: "30px 30px 0 30px" }}>
            Quantidade de vendas por bairro
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} data={dados_teste.bairro_genero}/>
          </Box>
        </Box>

        {/*  */}
        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} overflow="auto">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            color={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Gêneros mais vendidos
            </Typography>
          </Box>

          {dados_teste.genero_mais_vendidos.map((transaction, i) => (
            <Box
              key={`${transaction.livro}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
                  {transaction.livro}
                </Typography>

                {/* <Typography color={colors.greenAccent[100]}>
                  {transaction.quantidade}
                </Typography> */}
              </Box>
              <Box display="flex"  justifyContent="space-between" alignItems="center"  color={colors.grey[100]}>Quantidade:
              <Box color={colors.grey[900]} backgroundColor={colors.greenAccent[500]} ml="10px" p="5px 10px" borderRadius="4px">
                {transaction.quantidade}
              </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
