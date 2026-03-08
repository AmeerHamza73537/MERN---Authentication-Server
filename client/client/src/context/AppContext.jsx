// import { set } from "mongoose";
import { createContext } from "react";
import {useState, useEffect} from 'react'
import React from 'react';
import { toast } from "react-toastify";
import axios from 'axios'

export const AppContent = createContext()

export const AppContentProvider = (props)=>{
    
    axios.defaults.withCredentials = true // send cookies

    // derive backend URL from environment, fall back to hard‑coded dev address
    // this avoids relying on the Vite proxy (which must be restarted whenever config changes)
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
    const frontendUrl = import.meta.env.VITE_FRONTEND_URL || window.location.origin

    // make all axios requests target the backend by default; components can still
    // override with "backendUrl + '/path'" if necessary
    axios.defaults.baseURL = backendUrl
    // debug: show what URLs are when provider mounts
    console.log('⚙️ AppContext initialized, backendUrl=', backendUrl,
                'frontendUrl=', frontendUrl,
                'axios.baseURL=', axios.defaults.baseURL)

    const [isLoggedIn, setisLoggedIn] = useState(false)
    const [userData, setUserData] = useState(false)

    const getUserData = async () =>{
        try {
            console.log('→ getUserData request to', backendUrl + '/api/user/data')
            const {data} = await axios.get(backendUrl + '/api/user/data')
            data.success ? setUserData(data.userData) : toast.error(data.message)
        } catch (error) {
            console.error('getUserData error', error)
            toast.error(error.response?.data?.message || error.message)
        }
    }
    
    const getAuthState = async ()=>{
        try {
            console.log('→ getAuthState request to', backendUrl + '/api/auth/is-auth')
            const {data} = await axios.get(backendUrl + '/api/auth/is-auth')
            if(data.success){
                setisLoggedIn(true)
                getUserData()
            }
        } catch (error) {
            console.error('getAuthState error', error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getAuthState()
    }, [])

    const value = {
        backendUrl,
        frontendUrl,
        isLoggedIn, setisLoggedIn,
        userData, setUserData,
        getUserData,
    }

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}