import { Layout,  Empty, Button, Input, message } from 'antd';
import { React, useState } from 'react';
import ChangeAvatar from './antd/ChangeAvatar';
import { state } from './antd/ChangeAvatar';
import './Userprofile.css';
import { logout } from './Authorization'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { useHistory } from 'react-router';
import { AuthHeader } from '../App';

const {Content } = Layout;



export default function EditUserProfile(props) {
    const [User, setUser] = useState({ FirstName: null, LastName: null, Email: null, ImageUrl: null });
    let history = useHistory();

    const SaveChanges = user => {

       

            axios.post('api/UserProfile/SaveChanges', { FirstName: User.FirstName, LastName: User.LastName, Email: props.user.Email, Path: state.imageUrl }, AuthHeader())
                .then((response) => {
                    if (response.data.status === 'Success') {
                        history.push('/MyProfile');
                        history.go(0);
                    }
                    else {
                         message.error('Something gone wrong') 
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

        <Layout style={{ paddingLeft: 2 }}>

            <Content

                style={{

                    margin: 0,
                    minHeight: 885,


                }}
            >
                <div class="bg-container">
                    <div class="container">
                        <div class="text-center py-5">
                            <ChangeAvatar />
                            <div className="col-md-8 col-lg-6 col-xl-5 p-0 mx-auto" >

                                <Input onChange={e => setUser({ ...User, FirstName: e.target.value })} value={User.FirstName} placeholder="Enter new FirstName" bordered={false} style={{  marginTop: 20 }} />
                                <Input onChange={e => setUser({ ...User, LastName: e.target.value })} value={User.LastName} placeholder="Enter new LastName" bordered={false} style={{  marginTop: 10 }} />
                                <div class="text-muted mb-4 " style={{ marginTop: 20 }}>
                                    {props.user.Email}
                                </div>

                            </div>

                        </div>
                    </div>

                    <Button block className="Editbutton" onClick={SaveChanges}>Save Changes</Button >
                </div>

                <div class="text-center py-5">
                    <h4 className="display-6">Activity</h4>
                </div>
                <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{
                        height: 260,
                    }} style={{ marginBottom: 30 }} />

            </Content>
            <Button block onClick={logout} >Logout</Button>
        </Layout>
    )
}