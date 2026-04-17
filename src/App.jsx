import { Route, Routes } from 'react-router-dom';
import Error404 from './Components/Error404';
import Home from './pages/Home.jsx';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='*' element={<Error404/>}/>
    </Routes>
  )
}

export default App
