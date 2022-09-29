import './App.css';
import {BrowserRouter, Routes, Route, Router} from 'react-router-dom';
import StockDetailsPage from './pages/StockDetailsPage';
import StockOverviewPage from "./pages/StockOverviewPage";

function App() {
  return (
    <main className="container">
      <BrowserRouter>
        <Routes>
            <Route
                path='/'
                element={<StockOverviewPage />}
            />
            <Route
                path='/details:symbol'
                element={<StockDetailsPage />}
            />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
