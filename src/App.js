import React, {useState, useEffect} from "react";
import './App.css'
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/UI/Navbar/navbar";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context";

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        if(localStorage.getItem('auth')) {
            setIsAuth(true);
        };
        setLoading(false);
    }, []);


    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading
        }}>
            <BrowserRouter>
                <Navbar/>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    )
};

export default App;
