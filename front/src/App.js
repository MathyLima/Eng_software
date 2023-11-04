import { ColorModeContext,useMode } from "./theme";
import { CssBaseline,ThemeProvider } from "@mui/material";
import {Routes, Route} from "react-router-dom"
import Topbar from "./views/global/Topbar";
import Sidebar from "./views/global/Sidebar"
import Dashboard from "./views/dashboard/index";
import Team from "./views/team/index";
import Invoices from "./views/invoices/index";
import Contacts from "./views/contacts/index";
import Form from "./views/form/index";
import Calendar from "./views/calendar/index";
import FAQ from "./views/faq/index";
// import Bar from "./views/charts/bar/index";
import Line from "./views/charts/line/index";
import Pie from "./views/charts/pie/index";
import Geography from "./views/charts/geography/index";
import { useEffect, useState } from "react";
import { getFullData } from "./utils/fulldata";

function App() {
  const [theme,colorMode] = useMode();
  return (
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div className="app">
        <Sidebar/>
        <main className="content">
          <Topbar/>
          <Routes>
            <Route path="/" element={<Dashboard />}/>
            <Route path="/team" element={<Team/>}/>
            <Route path="/contacts" element={<Contacts/>}/>
            <Route path="/invoices" element={<Invoices/>}/>
            <Route path="/form" element={<Form/>}/>
            <Route path="/calendar" element={<Calendar/>}/>
            <Route path="/faq" element={<FAQ/>}/>
            {/* <Route path="/bar" element={<Bar data={data}/>}/> */}
            <Route path="/pie" element={<Pie/>}/>
            <Route path="/line" element={<Line/>}/>
            <Route path="/geography" element={<Geography/>}/>
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
}

export default App;
