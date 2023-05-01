import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import Input from './components/Input';
import LoginPage from './pages/LoginPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import RegistrationPage from './pages/RegistrationPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createContext, useEffect, useState } from 'react';
import Advertises from './pages/Advertises';
export const UserContext = createContext();
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    {

      path: "/advertises",
      element: <Advertises />,
      title: "advertises page"
    },
  ]
  useEffect(() => {
    if (sessionStorage.getItem("ACCESS_TOKEN")) {
      setIsLoggedIn(true);
    }
  }, [])
  return (
    <>
      <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <ToastContainer />
        <MainLayout>
          <div className="App">
            <Routes>
              <Route path='/' element={<Navigate to="/advertises" />} />
              {pagesList.map((page, i) => <Route key={i + 1} path={page.path} element={page.element} />)}
            </Routes>
          </div>

        </MainLayout>
      </UserContext.Provider>
    </>
  );
}

export default App;