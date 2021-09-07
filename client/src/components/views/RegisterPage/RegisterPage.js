import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action';

function RegisterPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [Name, setName] = useState("");

    const onEmailHandler = (e) =>{
        setEmail(e.target.value);
    }

    const onPasswordHandler = (e) =>{
        setPassword(e.target.value);
    }

    const onConfirmPasswordHandler = (e) =>{
        setConfirmPassword(e.target.value);
    }

    const onNameHandler = (e) =>{
        setName(e.target.value);
    }

    const onSubmitHandler = (e) =>{
        e.preventDefault();

        if(Password.length < 5){
            return alert('비밀번호를 5자 이상 입력해주세요.');
        }

        if(Password !== ConfirmPassword){
            return alert('비밀번호가 다릅니다.'); 
        }

        let body = {
            email : Email,
            password : Password,
            name : Name,
        }

        dispatch(registerUser(body))
        .then(res=>{
            if(res.payload.success){ 
                props.history.push('/login')
            }else{
                alert('Error');
            }
        })

    }

    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center',width:'100%',height:'100vh'}}>
            <form style={{display:'flex', flexDirection:'column'}} onSubmit={onSubmitHandler}>
                
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}></input>
                
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}></input>

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}></input>
                
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}></input>
                <br/>
                <button>
                    Register
                </button>
            </form>
        </div>
    )
}

export default RegisterPage
