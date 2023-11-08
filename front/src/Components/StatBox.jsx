import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgessCircle";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const numericProgress = parseFloat(progress);
  const isNegative = numericProgress < 0;
  const progresso = isNegative ? numericProgress * -1 : numericProgress;
  console.log(isNegative)
  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography variant="h4" fontWeight="bold" sx={{ color: colors.grey[100] }}>
            {title}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progresso/100} isNegative={isNegative} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography variant="h5" fontStyle="italic" sx={{ color: colors.greenAccent[600] }}>
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
