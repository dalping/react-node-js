import axios from 'axios'
import React from 'react'
import {withRouter} from  'react-router-dom';

function LandingPage(props) {

    const onClickHandler = (e) => {
        axios.get('/api/users/logout')
        .then(res => {
            if(res.data.success){
                alert('로그아웃 되었습니다.');
                props.history.push('/login')
            } else{
                alert('로그아웃 실패 했습니다.');
            }
        })
    }

    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center',width:'100%',height:'100vh'}}>
            <h2>Main Page</h2>
            <button onClick={onClickHandler}>로그아웃</button>
        </div>
    )
}

export default withRouter(LandingPage)
