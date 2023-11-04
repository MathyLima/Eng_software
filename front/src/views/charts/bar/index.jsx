import { Box } from "@mui/material";
import Header from "../../../Components/Header";
import BarChart from "../../../Components/Charts/BarChart";
import { getDataDashboard } from "../../../utils/fulldata";
import { useEffect, useState } from "react";

const Bar = (data) => {
    

    return (
        <Box m="20px">
            <Header title="Bar Chart" subtitle="Simple Bar Chart" />
            <Box height="75vh">
                {data ? (
                    <BarChart data={data} />
                ) : (
                    <div>Loading...</div>
                )}
            </Box>
        </Box>
    );
};

export default Bar;
