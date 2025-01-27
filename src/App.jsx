import './App.css'
import { Layout } from './Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import Etelek from './pages/Etelek';
import Partnereink from './pages/Partnereink';
import Blog from './pages/Blog';
import Charity from './Charity';
import Kapcsolat from './pages/Kapcsolat';
import Admin from './pages/Admin';
import Upload from './pages/Upload';
import Notfound from './pages/Notfound';
import Login from './pages/Login';

function App() {

  const router = createBrowserRouter([
    { path: "/", element: <Layout />, children: [
      { path: "/home", element: <Home /> },
      { path: "/etelek", element: <Etelek /> },
      { path: "/partnereink", element: <Partnereink /> },
      { path: "/blog", element: <Blog /> },
      { path: "/charity", element: <Charity /> },
      { path: "/kapcsolat", element: <Kapcsolat /> },
      { path: "/admin", element: <Admin /> },
      { path: "/upload", element: <Upload /> },
      { path: "/login", element: <Login /> },
      { path: "*", element: <Notfound /> }
    ]}
  ]);

  return (
    <div className='app'>
    <RouterProvider router={router} />
    </div>
  )
}

export default App
