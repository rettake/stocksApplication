import './App.css';
import {BrowserRouter, Routes, Route, Router} from 'react-router-dom';
import StockDetailsPage from './pages/StockDetailsPage';
import StockOverviewPage from "./pages/StockOverviewPage";
import {WatchListContextProvider} from "./context/watchListContext";

function App() {
  return (
    <main className="container">
      <WatchListContextProvider>
          <BrowserRouter>
              <Routes>
                  <Route
                      path='/'
                      element={<StockOverviewPage />}
                  />
                  <Route
                      path='/details/:symbol'
                      element={<StockDetailsPage />}
                  />
              </Routes>
          </BrowserRouter>
      </WatchListContextProvider>
    </main>
  );
}

export default App;
