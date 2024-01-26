/* eslint-disable no-unused-vars */
import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth"; // mapeia se a autenticação do usuário foi feita com sucesso

// Hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from "./hooks/useAuthentication";

// Context
import { AuthProvider } from './contexts/AuthContext';

// Pages
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import Search from './pages/Search/Search';
import Post from './pages/Post/Post';
import EditPost from './pages/EditPost/EditPost';

function App() {

  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined; // Se por acaso user for undefined, de alguma maneira esta carregando algum usuário

  // Usuário saindo (botão sair) já altera o user que não tem mais autentificação e não da mais para mexer no site
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value = {{user}}> {/* Com isso é possível acessar o usuário em todos os locais */}
        <BrowserRouter>
          <Navbar/>
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/search' element={<Search/>}/>
              <Route path='/posts/:id' element={<Post/>}/>              
              <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>}/>
              <Route path='/register' element={!user ? <Register/> : <Navigate to='/'/>}/>
              <Route path='/posts/edit/:id' element={user ? <EditPost/> : <Navigate to='/login'/>}/>
              <Route path='/posts/create' element={user ? <CreatePost/> : <Navigate to='/login'/>}/>
              <Route path='/dashboard' element={user ? <Dashboard/> : <Navigate to='/login'/>}/>
            </Routes>
          </div>
          <Footer/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
