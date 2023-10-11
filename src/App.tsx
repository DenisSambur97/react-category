import React from 'react';
import { Routes, Route, RouteProps } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import CategoryList from './components/CategoryList';
import CategoryPage from "./components/CategoryPage";

const Home: React.FC<RouteProps> = () => (
    <div>
        <Outlet />
    </div>
);

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />}>
                    <Route index element={<CategoryList />} />
                    <Route path="/category/:id" element={<CategoryPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
