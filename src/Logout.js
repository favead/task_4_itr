import React from 'react';

export const Logout = () => {

    const handleClick = ()=>{
        sessionStorage.setItem("isAuth",false)
        window.location.reload();
    }

    return (
        <div className = "logout">
            <button onClick = {handleClick}>Выйти</button>
        </div>
    )
}