import React,{useState} from 'react';
import { useEffect } from 'react/cjs/react.development';


export const Main = (props) => {
    const [broCount,setBroCount] = useState(0);
    const [sisCount,setSisCount] = useState(0);
    const [lastSentBro,setLastSentBro] = useState({
        "name" : "",
        "date" : ""
    })
    const [lastSentSis,setLastSentSis] = useState({
        "name " : "",
        "date " : ""
    })


    useEffect(()=>{
        fetch(props.server+"getBroInfo")
        .then(response => {
            response.json().then((res)=> {
                    setLastSentBro(res.user[Array.from(res.user).length-1])
                })
        }).catch(err=>console.log(err))
        fetch(props.server+"getSisInfo")
        .then( response => {
            response.json().then((res)=>{
                setLastSentSis(res.user[Array.from(res.user).length-1])
            })
        }).catch(err=>console.log(err))
         fetch(props.server+"getMessage")
         .then(response => {
                response.json().then((res)=> {
                    if(res.mes[Array.from(res.mes).length-1]['Count'] !== broCount+sisCount){
                        setBroCount(res.mes[Array.from(res.mes).length-1]['Bro']);
                        setSisCount(res.mes[Array.from(res.mes).length-1]['Sis']);
                    }
             })
        })
    },[broCount,props.server,sisCount])


    const handleClick = (e) => {
        if(props.isAuth){
            let message = e.target.id;
            let name = props.user.name
            let date = (new Date()).toTimeString().substr(0,5);
            let lcBro = broCount;
            let lcSis = sisCount;
            if(message === "Bro"){
                lcBro+=1;
                fetch(props.server+`setBroMessage/${name}/${date}`);
            }else if(message === "Sis"){
                lcSis+=1;
                fetch(props.server+`setSisMessage/${name}/${date}`);
            }
            fetch(props.server+`SetMessage/${lcBro}/${lcSis}`)
            window.location.reload();
        }
    }


    return (
        <div className = "main_buttons">
            <div className = "button">
                {props.isAuth ? <p className = "sent_by">Last sent by {lastSentBro.name} {lastSentBro.date}</p> : null}
                <button onClick = {handleClick} id = "Bro">Bro!</button>
                <p>{broCount}</p>
            </div>
            <div className = "button">
                {props.isAuth ? <p className = "sent_by">Last sent by {lastSentSis.name} {lastSentSis.date}</p> : null}
                <button onClick = {handleClick} id = "Sis">Sis!</button>
                <p>{sisCount}</p>
            </div>
        </div>
    )
}

