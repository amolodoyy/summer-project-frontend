import { Form, Input, Button, Spin, Space, message, Modal } from 'antd';
import { React, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { rerenderfunction } from '..';
import { showDrawerReg } from './Registration';
import axios from 'axios';
import { useHistory } from 'react-router';
import './Registration.css';



export function authHeader() {

    const token = localStorage.getItem('token');
    return { "Authorization": 'Bearer ' + token };

}


export let getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));;
}


export let state = { visible: false, isAuth: false, Response: null };

export let userState = { FirstName: null, LastName: null, Email: null, ImageUrl: null, Id: null }

export let showModel = () => {

    state.visible = true;
    rerenderfunction();

};

export let logout = () => {
    state.isAuth = false;
    localStorage.removeItem('token');
    window.location.reload();
  

}


export default function Authorization(props) {
    const [Load, setLoad] = useState(false);
    const [User, setUser] = useState({ Email: null, Password: null, RememberMe: true, ReturnUrl: null });

    const [validateMessages, ] = useState({
        required: 'it is required!',
        types: {
            Password: 'It is not a valid password',
            email: 'It is not a valid email!',
            number: 'It is not a valid number!',
        },
        
    });

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    let history = useHistory();

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };



    const handleOk = () => {
        state.visible = false;
        rerenderfunction();
    };

    const handleCancel = () => {
        state.visible = false;
        rerenderfunction();
    };

    const submitHandler = e => {
       
        setLoad(true);
       
        if (!validateEmail(User.Email)) {
            message.error('Your email is not valid');
        }
        let str = User.Password;
        if (str.length < 6) {
            message.error('Your password is too short');
        }
        else if (str.length > 17) {
            message.error('Your password is too long')
        }
        else {
            Login(User);
        }

    }


    

    const Login = user => {



        axios.post('api/Account/Login', { Email: User.Email, Password: User.Password, RememberMe: User.RememberMe }, { headers: authHeader() })
            .then((response) => {
                state.Response = response.data.status;
                localStorage.setItem('token', response.data.message);
                if (state.Response === 'Success') {
                    state.isAuth = true;
                    message.success('You have successfully logged in');
                    handleCancel();
                    history.push('/Home');
                    history.go(0);
                      
                }
                else {
                   
                    setLoad(false);rerenderfunction(); message.error('Wrong password or login'); 
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

            rerenderfunction();

    }

  

   

    return (

        <Modal title="Log in"
            visible={state.visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[

            ]}

        >
            <Spin spinning={Load} tip="Loading..." indicator= {<LoadingOutlined style={{ fontSize: 24 }} spin />} >
            <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
                <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email', required: true }]}>
                    <Input onChange={e => setUser({ ...User, Email: e.target.value })} value={User.Email} />
                </Form.Item>
                <Form.Item name={['user', 'password']} label="Password" rules={[{ required: true, message: 'is not a valid password' }]}>
                    <Input.Password onChange={e => setUser({ ...User, Password: e.target.value })} value={User.Password} />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Space direction="vertical">
                        <Button type="primary" htmlType="submit" onClick={submitHandler}>
                            Submit
                        </Button>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 7 }}>
                            <Button type="link" onClick={showDrawerReg}>I don't have an account</Button>
                        </Form.Item>
                    </Space>
                </Form.Item>


            </Form>
            </Spin>
        </Modal>
    );
};