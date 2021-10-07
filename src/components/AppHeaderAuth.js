import 'antd/dist/antd.css'
import { Button, Col, Row} from 'antd';
import { UserOutlined,HomeOutlined, FileOutlined } from '@ant-design/icons';
import React from 'react';
import './AppHeaderAuth.css';
import { NavLink,BrowserRouter as Router } from 'react-router-dom';
import { showModalCreate } from './SpacesCreation'




export default function AppHeaderAuth(props) {





    return (
        <div className="header">

            <Row >

                <Col span={8}>
                    <NavLink to="/Home">
                        <Button block icon={<HomeOutlined />} >
                            Home page
                        </Button>
                    </NavLink>
                </Col>

                <Col span={8}>
                    <Button block size={43} icon={<FileOutlined />} onClick={showModalCreate} >
                        Create
                    </Button>
                </Col>


                <Col span={8} color={'white'}>
                    <Router forceRefresh>  <NavLink to="/MyProfile" >
                        <Button type="primary" block icon={<UserOutlined />} >
                            My Profile
                        </Button>
                    </NavLink>
                    </Router>
                </Col>


            </Row>
        </div>
    )
}
