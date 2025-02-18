function App() {
  console.log(window.ipcRenderer);

  const sendMessageToElectron = () => {
    if (window.Main) {
      window.Main.sendMessage(t('common.helloElectron'));
    } else {
      setFromMain(t('common.helloBrowser'));
    }
    setSent(true);
  };

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
    </BrowserRouter>
  );
}

export default App;
