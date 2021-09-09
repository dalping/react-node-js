import React from 'react'
import {useSelector} from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function MenuRight(props) {

    const user = useSelector(state => state.user_reducer);
    
    const onLogoutHandler = (e) => {
        axios.get('/api/users/logout')
        .then(res => {
            if(res.data.success){
                alert('로그아웃 되었습니다.');
                props.history.push("/login");
            } else{
                alert('로그아웃 실패 했습니다.');
            }
        })
    }

    const onLoginHandler = (e) =>{
        props.history.push("/login")
    }

    const onRegisterHandler = (e) =>{
        props.history.push("/register")
    }

    if(user.userData && !user.userData.isAuth){ //로그인 했을 경우
        return (
            <div className="navbar_right">
                <div className="navbar_item">
                    <a onClick={onLoginHandler}>Login</a>
                </div>
                <div className="navbar_item">
                    <a onClick={onRegisterHandler}>Register</a>
                </div>
            </div>
        )
    }else{ //로그인 하지 않았을 경우
        return (
            <div className="navbar_right">
                <div className="navbar_item">
                    <a>Mypage</a>
                </div>
                <div className="navbar_item">
                    <a onClick={onLogoutHandler}>Logout</a>
                </div>
            </div>
        )
    }
}

export default withRouter(MenuRight)
