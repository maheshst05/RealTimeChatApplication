
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
function App() {
  return (
    
    <>
    {/* <Chat></Chat> */}
  <Routes>
  <Route path='/' element={<App/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/chat' element={<Chat/>}></Route>
  </Routes>
    </>
  );
}


export default App;
