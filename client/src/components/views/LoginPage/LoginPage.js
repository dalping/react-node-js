
import React,{ useState } from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import {withRouter} from  'react-router-dom';

function LoginPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (e) =>{
        setEmail(e.target.value);
    }

    const onPasswordHandler = (e) =>{
        setPassword(e.target.value);
    }

    const onSubmitHandler = (e) =>{
        e.preventDefault(); //page refresh 방지

        if(Email === ''|| Password ==='') return alert('아이디와 비밀번호를 입력하세요.')

        let body = {
            email:Email,
            password:Password
        }

        dispatch(loginUser(body))
        .then(res=>{
            if(res.payload.loginSuccess){ //로그인 성공시
                props.history.push('/')
            }else{
                if(res.payload.err_type === "not_exist_email" || res.payload.err_type === "wrong_password" ) 
                    return alert('아이디와 비밀번호를 다시 확인해주세요.');                
            }
        })
    }

    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center',width:'100%',height:'100vh'}}>
            <form style={{display:'flex', flexDirection:'column'}} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}></input>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}></input>
                <br/>
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
