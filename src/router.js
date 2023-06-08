import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import App from './App'
import Login from './login'
import Registro from './registro'
const Router = () =>{ 
    return(
        <BrowserRouter>
            <Routes>
                <Route index element={<App/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/registro' element={<Registro/>}/>
            </Routes>
        </BrowserRouter>
        )
        
}
export default Router