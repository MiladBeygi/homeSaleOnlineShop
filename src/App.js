import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import Input from './components/Input';
import LoginPage from './pages/LoginPage';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import RegistrationPage from './pages/RegistrationPage';

function App() {
  const pagesList = [
    {
      path: "/login",
      element: <LoginPage />,
      title: "login page"
    },
    {
      path: "/registration",
      element: <RegistrationPage />,
      title: "registartion page"
    },
  ]
  return (
    <MainLayout>
      <div className="App">
        <Routes>
          {pagesList.map((page, i) => <Route key={i + 1} path={page.path} element={page.element} />)}
        </Routes>
      </div>
    </MainLayout>
  );
}

export default App;
