// import { set } from "mongoose";
import { createContext } from "react";
import {useState, useEffect} from 'react'
import React from 'react';
import { toast } from "react-toastify";
import axios from 'axios'

export const AppContent = createContext()

export const AppContentProvider = (props)=>{
    
    axios.defaults.withCredentials = true // This will allow axios to send cookies with requests

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const [userData, setUserData] = useState(false)
    
    const getUserData = async () =>{
        try {
            const data = await axios.get(backendUrl + '/api/user/data')
            data.success ? setUserData(data.userData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
    }
    
    const getAuthState = async ()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/auth/is-auth')
            if(data.success){
                setisLoggedIn(true)
                getUserData()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getAuthState()
    }, [])

    const value = {
        backendUrl,
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