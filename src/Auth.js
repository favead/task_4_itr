import React from 'react';
import { Googlebutton } from './Googlebutton'
import {Vkbutton} from './Vkbutton'


export const Auth = (props) => {


    return (
        <div className = "auth">
            <div className = "autn_button_text">
                <p>Войдите через :</p>
            </div>
            <div className = "auth_button">
            <Vkbutton res = {props.res} setRes = {props.setRes} domain = {props.domain}/>
            <Googlebutton />
            </div>
        </div>
    )


}