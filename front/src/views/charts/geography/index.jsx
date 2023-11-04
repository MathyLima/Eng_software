import { Box } from "@mui/material";
import Header from "../../../Components/Header";
import GeographyChart from "../../../Components/Charts/GeographyChart";

const Pie = () => {
  return (
    <Box m="20px">
      <Header title="Geography Chart" subtitle="Simple Geography Chart" />
      <Box height="75vh">
        <GeographyChart />
      </Box>
    </Box>
  );
};

export default Pie;