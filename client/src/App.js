import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Admin from './pages/admin/Admin';
import Home from './pages/Home';

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='admin/*' element={<Admin/>}/>
      <Route path ='*' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;
