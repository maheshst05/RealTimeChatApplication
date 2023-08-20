import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import SetAvtatar from './pages/SetAvtatar';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Chat />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/setavtar' element={<SetAvtatar />} />
      <Route path='/chat' element={<Chat />} />

    </Routes>
  );
}


export default App;
