import logo from './logo.svg';
import './App.css';
import { FormContext } from './FormContext';
import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import Navbar from './Component/Navbar';
import Nationality from './screens/Nationality';
import Departments from './screens/Departments';
import Doctors from './screens/Docters';
import Nationality1 from './screens/About';
import DataTableCrud from './DataTableCrud';
import DepartmentsView from './Component/DepartmentsView';
import DocterView from './screens/DocterView';
import Footer from './Component/Footer';
import Breadcrumbs from './Component/BreadCrumbs';

function App() {
  const {
    state
  } = useContext(FormContext);
  return (
    <BrowserRouter>
      <Navbar />
      <Breadcrumbs/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/nationality" element={<Nationality/>} />
        <Route path="/department" element={<Departments/>} />
        <Route path="/docters" element={<Doctors/>} />
        <Route path="/about" element={<Nationality1/>} />
        <Route path="/departmentview" element={<DepartmentsView/>} />
        <Route path="/docterview/:id" element={<DocterView/>} />
        <Route path="/docterview" element={<DocterView/>} />
        <Route path="*" element={<Home />}  />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
