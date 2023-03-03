import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Messenger from './components/Messenger';
import ProtectRoute from './components/ProtectRoute';
import Register from './components/Register';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/"
                    element={
                        <ProtectRoute>
                            {' '}
                            <Messenger />{' '}
                        </ProtectRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
