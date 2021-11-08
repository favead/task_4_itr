import React,{useEffect} from 'react';

export const Googlebutton = () => {

    useEffect(()=>{
        if(window.gapi){
        window.gapi.load('auth2', () => {
                window.gapi.auth2
                    .init({
                        client_id : 
                            '67004386703-fhd23gane8e33ic0tipmallu5insve0q.apps.googleusercontent.com'
                    })
                })
        }
    })


    const signIn = () =>{
        const auth2 = window.gapi.auth2.getAuthInstance()
        auth2.signIn().then(googleUser=>{
            const profile = googleUser.getBasicProfile()
            sessionStorage.setItem("name",profile.getName())
            sessionStorage.setItem("isAuth",true)
            window.location.reload();
        })
    }


    return (
        <div className = "google_auth">
            <button className = "google_btn" onClick = {signIn}>Вход через Гугл</button>
        </div>
    )
}