import React,{useEffect} from 'react';
import jsonp from 'jsonp';


export const Vkbutton = (props) => {


    useEffect(()=>{
        let url = props.domain+"/#";
        if(window.location.href.includes(url)){
            let get = window.location.href.replace(url,"");
            let tmp = get.split("&");
            tmp.forEach(str=>{
                props.res[str.split("=")[0]] = str.split("=")[1];
            })
            props.setRes(props.res)
        }
    })


    useEffect(()=>{
        if(props.res["user_id"].length > 0){
            jsonp(`https://api.vk.com/method/users.get?user_ids=${props.res["user_id"]}&fields=bdate&access_token=${props.res["access_token"]}&v=5.131`,null,(err,data) => {
                if(err){
                    console.error(err.message);
                }
                else{
                    sessionStorage.setItem("name",data.response[0].first_name)
                    sessionStorage.setItem('isAuth','true');
                    window.history.replaceState({}, document.title, "/");
                    window.location.reload();
             
                }
            })
        }
    })


    return (
        <div className = "vk_auth">
            <button className = "vk_btn"><a className = "vk_link" href = "https://oauth.vk.com/authorize?client_id=7990321&display=page&redirect_uri=http://localhost:3000&scope=friends&response_type=token&v=5.131&state=1">Войти через ВК</a></button>
        </div>
    )
}

