import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from './components/Home/Layout.jsx'
import Dashboard  from './pages/Dashboard.jsx'
import Accounts from './pages/Accounts.jsx'
import Scheduler from './pages/Scheduler.jsx'
import AIComposer from './pages/AIComposer.jsx'

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                <Route element={<Layout />}>
                   <Route path="/dashboard" element={<Dashboard />}/>  
                   <Route path="/accounts" element={<Accounts />}/>  
                   <Route path="/schedule" element={<Scheduler />}/>  
                   <Route path="/ai-composer" element={<AIComposer />}/>  
                </Route>
                
            </Routes>
        </>
    );
}
