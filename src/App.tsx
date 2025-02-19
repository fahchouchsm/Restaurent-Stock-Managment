import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SideBar from './components/sideBar';
import { GestionDesStocks } from './pages/gestionDesStocks/GestionDesStocks';
import { ipcRenderer } from 'electron';
import { ToastContainer } from 'react-toastify';

function App() {
  console.log(window.ipcRenderer);

  useEffect(() => {
    window.Main.removeLoading();
  }, []);

  return (
    <BrowserRouter>
      <div className="flex">
        <SideBar />
        <div className="content w-full xl:flex-7 flex-5">
          <Routes>
            <Route
              path="/"
              // element={<Accueil />}
            />
            <Route
              path="/stock"
              element={<GestionDesStocks />}
            />
            <Route
              path="/repas"
              // element={<Repas />}
            />
            <Route
              path="/transactions"
              // element={<Transactions />}
            />
            <Route
              path="/alertes"
              // element={<Alertes />}
            />
          </Routes>
        </div>
      </div>
      <ToastContainer
        autoClose={5000}
        position={'bottom-right'}
      />
    </BrowserRouter>
  );
}

export default App;
