import React from 'react'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function MyPage() {
    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center',width:'100%',height:'100vh'}}>
            <label>Name</label>
            <Avatar size={64} icon={<UserOutlined />} />

        </div>
    )
}

export default MyPage
