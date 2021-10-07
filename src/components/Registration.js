import { Form, Input, Button,Spin, message, Modal } from 'antd';
import { React, useState } from 'react';
import { rerenderfunction } from '..';
import './Registration.css';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';
import { logout } from './Authorization';


export let stateReg = { visible: false };

export let showDrawerReg = () => {

    stateReg.visible = true;

    rerenderfunction();
};








export default function Registration(props) {
    const [Load, setLoad] = useState(false);
    const [User, setUser] = useState({ FirstName: null, LastName: null, Email: null, Password: null, PasswordConfirm: null });
    const [validateMessages,] = useState({
        required: 'It is required!',
        types: {
            email: 'it is not a valid email!',
            number: 'it is not a valid number!',
            password: 'it} is not a valid password!',
        },
    });

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const handleOk = () => {
        stateReg.visible = false;
        rerenderfunction();
    };

    const handleCancel = () => {
        stateReg.visible = false;
        rerenderfunction();
    };
    const submitHandler = e => {
        
        let str = User.Password;
        if(str){
            
            if (str.length < 6) {
                message.error('Your password is too short');
            }
            else if (str.length > 17) {
                message.error('Your password is too long')
            }
            else {
                setLoad(true);
                Registrate(User);
            }
        }
        else{
            message.error('Error');
        }
        

    }




    const Registrate = user => {
        axios.post('api/Account/Register', { FirstName: User.FirstName, LastName: User.LastName, Email: User.Email, Password: User.Password, PasswordConfirm: User.PasswordConfirm })
            .then((response) => {
                stateReg.Response = response.data.status;
                if (stateReg.Response === 'Success') { message.success('Please check your Email to confirm registration'); handleOk(); }
                else {
                     setLoad(false); rerenderfunction(); message.error('Something gone wrong') 
                }
            })

            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        logout();
                    } else if (error.request) {
                        message.error('Ooops something gone wrong ');
                    } else {
                        message.error('Ooops something gone wrong ');
                    }
                }
            })




    }



    return (
        <Modal title="Create a new account"
            visible={stateReg.visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[

            ]}
        >
            <Spin spinning={Load} tip="Loading..." indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} >
                <Form {...layout} name="nest-messages" validateMessages={validateMessages} >
                    <Form.Item name={['user', 'FirstName']} label="Name" rules={[{ required: true }]}>
                        <Input onChange={e => setUser({ ...User, FirstName: e.target.value })} value={User.FirstName} />
                    </Form.Item>
                    <Form.Item name={['user', 'LastName']} label="LastName" rules={[{ required: true }]}>
                        <Input onChange={e => setUser({ ...User, LastName: e.target.value })} value={User.LastName} />
                    </Form.Item>
                    <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email', required: true }]}>
                        <Input onChange={e => setUser({ ...User, Email: e.target.value })} value={User.Email} />
                    </Form.Item>
                    <Form.Item name={['user', 'Password']} label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password onChange={e => setUser({ ...User, Password: e.target.value })} value={User.Password} />
                    </Form.Item>
                    <Form.Item name={['user', 'PasswordConfirm']} label="Confirm password" rules={[{ required: true, message: 'Please Confirm password!' }]}>
                        <Input.Password onChange={e => setUser({ ...User, PasswordConfirm: e.target.value })} value={User.PasswordConfirm} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit" onClick={submitHandler}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>

        </Modal>
    );
};