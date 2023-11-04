import { Box,useTheme,Typography } from "@mui/material";
import Header from "../../Components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { tokens } from "../../theme";


const FAQ = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    return(
        <Box m="20px">
            <Header title="FAQ" subtitle="Frequently Asked Questions Page"/>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend, nunc non malesuada euismod, erat ligula hendrerit sapien, et malesuada tellus est vel nunc. Nullam vel odio vel ligula feugiat sollicitudin. Vestibulum scelerisque eleifend lacus, id fermentum neque bibendum at. Nulla facilisi. Nulla facilisi. Nulla in sem a quam fringilla consectetur. Suspendisse tristique vel dolor vel viverra. Sed in pharetra arcu, nec ultrices libero. In hac habitasse platea dictumst. Fusce nec cursus erat, id sollicitudin nisi. Nullam ut arcu nec justo scelerisque condimentum. Phasellus convallis vel nunc eu mattis. Nulla facilisi.
                    </Typography>
                </AccordionSummary>
            </Accordion>
        </Box>
    )
}

export default FAQ;