import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./views/dashboard/index";
import Team from "./views/team/index";
import Invoices from "./views/invoices/index";
import Clientes from "./views/clientes/index";
import Form from "./views/formClient/index";
import Calendar from "./views/calendar/index";
import FAQ from "./views/faq/index";
// import Bar from "./views/charts/bar/index";
import Line from "./views/charts/line/index";
import Pie from "./views/charts/pie/index";
import Geography from "./views/charts/geography/index";
import FormVendedor from "./views/formVendedor";
import LoginForm from "./views/login";
import PrivateRoute from "./auth";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<PrivateRoute children={<Dashboard />} />} />
          <Route path="/" element={<PrivateRoute children={<Dashboard />} />} />
          <Route path="/team" element={<PrivateRoute children={<Team />} />} />
          <Route
            path="/clientes"
            element={<PrivateRoute children={<Clientes />} />}
          />
          <Route
            path="/invoices"
            element={<PrivateRoute children={<Invoices />} />}
          />
          <Route path="/form" element={<PrivateRoute children={<Form />} />} />
          <Route
            path="/formVendedor"
            element={<PrivateRoute children={<FormVendedor />} />}
          />
          <Route
            path="/calendar"
            element={<PrivateRoute children={<Calendar />} />}
          />
          <Route path="/faq" element={<PrivateRoute children={<FAQ />} />} />
          {/* <Route path="/bar" element={<Bar data={data}/>}/> */}
          <Route path="/" element={<PrivateRoute children={<Dashboard />} />} />
          <Route path="/pie" element={<PrivateRoute children={<Pie />} />} />
          <Route path="/line" element={<PrivateRoute children={<Line />} />} />
          <Route
            path="/geography"
            element={<PrivateRoute children={<Geography />} />}
          />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
