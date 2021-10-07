import { Layout, Col, Row, Avatar, Empty, Button, message, Card } from 'antd';
import {  CommentOutlined, FileTextTwoTone, AntDesignOutlined } from '@ant-design/icons';
import { React, useEffect } from 'react';
import './Userprofile.css';
import { logout } from './Authorization'
import 'bootstrap/dist/css/bootstrap.min.css'
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthHeader } from '../App';
import { rerenderfunction } from '..';
import { userId } from './AppMenuAuth';
const { Content } = Layout;
const { Meta } = Card;

let MyComments = [];
let userPages = [];
let AllPages = [];
export default function UserProfile(props) {
    let history = useHistory();
    
    const GetComment = () => {   
            
                axios.get(`Comments?userId=${props.user.Me ? userId : props.user.key}`, AuthHeader())
                    .then((response) => {
                        
                        for (let i = 0; i < response.data.length; i++) {
                            let ob = { key: response.data[i].id, pagesId: response.data[i].pagesId + "p", dateCreated: response.data[i].dateCreated, userId: response.data[i].userId, title: null }
                           
                            for (let i = 0; i < AllPages.length; i++) {
                                if (AllPages[i].key === ob.pagesId) {
                                    ob.title = AllPages[i].title
                                }

                            }
                            MyComments.push(ob);
                        }
                        rerenderfunction();

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


    const GetAllPages = () => {
        axios.get('/Pages/getAll', AuthHeader())
            .then((response) => {
               
                for (let i = 0; i < response.data.length; i++) {


                    let ob = { key: response.data[i].id + "p", title: response.data[i].name, parentId: response.data[i].parentId + "p", body: response.data[i].body, dataCreated: response.data[i].dateCreated, userId: response.data[i].userId }
                    if (response.data[i].parentId === 0) {
                        ob.parentId = response.data[i].spacesId
                    }

                    AllPages.push(ob);
                }
                GetComment();



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


    useEffect(() => {


        GetAllPages();
        if (!props.user.key) {
            userPages = props.pages;
        }
        else {
            axios.get(`Pages?userId=${props.pages[0].userId}`, AuthHeader())
                .then((response) => {
                    for (let i = 0; i < response.data.length; i++) {

                       
                        let ob = { key: response.data[i].id + "p", title: response.data[i].name, parentId: response.data[i].parentId + "p", body: response.data[i].body, dataCreated: response.data[i].dateCreated }
                        if (response.data[i].parentId === 0) {
                            ob.parentId = response.data[i].spacesId
                        }
                        userPages.push(ob);


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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


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
                            <Avatar
                                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 180, xxl: 180 }}
                                icon={<AntDesignOutlined />}
                                src={props.user.ImageUrl}
                            />

                            <div class="col-md-8 col-lg-6 col-xl-5 p-0 mx-auto">

                                <h3 className="font-weight-bold my-4" >{props.user.title} </h3>

                                <div class="text-muted mb-4">
                                    {props.user.Email}
                                </div>

                            </div>

                        </div>
                    </div>

                    {props.user.key ? null : <NavLink to="/EditProfile"><Button block className="Editbutton" >Edit Profile</Button></NavLink>}
                </div>



                <Row gutter={[250, 100]}>
                    <Col span={12} style={{ marginBottom: 30 }} >
                        <div className="text-center py-5" style={{ marginTop: 50 }}>
                            <h4 className="Activity">Pages Activity</h4>
                        </div>
                        {userPages ?
                            <>
                                {userPages.map(pages => (
                                    
                                    <Card
                                        style={{float:'left', width: 300}}
                                        className="card"
                                    >
                                        <Meta
                                            avatar={
                                                <Avatar src={props.user.ImageUrl} />
                                            }
                                            title={pages.title}
                                            description={' Was published: ' + pages.dataCreated.substr(0, 10)}
                                            onClick={function () { history.push('/' + pages.title + pages.key); }} />
                                        <FileTextTwoTone />
                                    </Card>
                                   


                                ))}
                            </>

                            :
                            <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                imageStyle={{
                                    height: 260,
                                }} style={{ marginBottom: 30 }}
                            />

                        }
                    </Col>

                    <Col span={12} style={{ marginBottom: 30 }}>
                        <div className="text-center py-5" style={{ marginTop: 50 }}>
                            <h4 className="Activity">Comments Activity</h4>
                        </div>
                        {MyComments ?
                            <>
                                {MyComments.map(MyComments => (

                                    <Card
                                        style={{ width: 300, float:'left' }}

                                        className="card"
                                    >
                                        <Meta
                                            avatar={
                                                <Avatar src={props.user.ImageUrl} />
                                            }
                                            title={MyComments.title}
                                            description={'Comments: ' + MyComments.dateCreated.substr(0, 10)}
                                            onClick={function () { history.push('/' + MyComments.title + MyComments.pagesId); }} />
                                        <CommentOutlined />
                                    </Card>



                                ))}
                            </>

                            :
                            <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                imageStyle={{
                                    height: 260,
                                }} style={{ marginBottom: 30 }}
                            />

                        }
                    </Col>

                

                </Row>
            </Content>
            {props.user.key ? null : <Button block onClick={logout} >Logout</Button>}
        </Layout>
    )
}
