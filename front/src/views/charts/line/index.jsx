import { Box } from "@mui/material";
import Header from "../../../Components/Header";
import LineChart from "../../../Components/Charts/LineChart";

const Pie = () => {
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Pie;