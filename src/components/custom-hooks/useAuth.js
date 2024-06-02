import React, { useState } from 'react'
import { useEffect } from 'react'



export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const user = localStorage.getItem('user')
        setCurrentUser(user)
    }, [])
    return currentUser
}

export default useAuth