import { Layout, Menu, Tree, Button,Avatar,  message } from 'antd';
import { DeleteTwoTone, DownOutlined, CloudOutlined, FolderFilled, FileTextTwoTone } from '@ant-design/icons';
import { React, useEffect, useState } from 'react';
import './AppMenu.css';
import HomepageAuth from './HomepageAuth';
import UserProfile from './UserProfile';
import { NavLink, Route, useHistory,BrowserRouter as Router } from 'react-router-dom';
import EditUserProfile from './EditUserProfile';
import axios from 'axios';
import { rerenderfunction } from '..';
import { logout } from './Authorization'
import { AuthHeader } from '../App';
import avatar from '../images/avatar.gif';
import UserPage from './UserPage';

const { SubMenu } = Menu;


export let userId = null;

const hierarchy = (

    data = [],
    { idKey = 'id', parentKey = 'parentId', childrenKey = 'children' } = {}
) => {

    const tree = [];
    const childrenOf = {};
    data.forEach((item) => {

        const { [idKey]: id, [parentKey]: parentId = 0 } = item;
        childrenOf[id] = childrenOf[id] || [];
        item[childrenKey] = childrenOf[id];
        parentId
            ? (
                childrenOf[parentId] = childrenOf[parentId] || []
            ).push(item)
            : tree.push(item);
    });
    return tree;
}

export let list = []
export let tree = [];

export let AllList = []
export let AllTree = [];

export let MyPages = [];
export let MySpaces = [];

export default function AppMenuAuth(props) {
    const [User, setUser] = useState({ title: null, Email: null, ImageUrl: null, Id: null,Me:true });
    let history = useHistory();



    useEffect(() => {
        (

            async () => {

                localStorage.getItem('token');
                axios.get('api/UserProfile', AuthHeader())
                    .then((response) => {
                        let imgUrl = response.data.path;

                        if (imgUrl === '1') {
                            imgUrl = avatar;
                        }
                        if (response.data.email != null) {

                            setUser({ ...User, title: response.data.firstName + " " + response.data.lastName, Email: response.data.email, ImageUrl: imgUrl, Id: response.data.id,Me: true })
                            userId = response.data.id;
                            GetAllUsers();



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

        )();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const GetAllUsers = () => {

        localStorage.getItem('token');

        axios.get('api/UserProfile/GetUsers', AuthHeader())
            .then((response) => {

                for (let i = 0; i < response.data.length; i++) {

                    let ob = { key: response.data[i].id, title: response.data[i].firstName + ' ' + response.data[i].lastName, parentId: "", ImageUrl: response.data[i].path, Email: response.data[i].email }
                    if (ob.ImageUrl === '1') {
                        ob.ImageUrl = avatar;
                    }
                    AllList.push(ob);
                }
                rerenderfunction();
                GetSpaces();
                GetAllSpaces();
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

    const GetAllSpaces = () => {

        localStorage.getItem('token');

        axios.get(`/Spaces/getAll?userId=${userId}`, AuthHeader())
            .then((response) => {

                for (let i = 0; i < response.data.length; i++) {

                    let ob = { key: response.data[i].id, title: response.data[i].name, parentId: response.data[i].userId, icon: <CloudOutlined /> }

                    AllList.push(ob);
                }
                rerenderfunction();
                GetAllPages();

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

        localStorage.getItem('token');

        axios.get(`/Pages/getAllUsersPages?userId=${userId}`, AuthHeader())
            .then((response) => {
                for (let i = 0; i < response.data.length; i++) {


                    let ob = { key: response.data[i].id + "p", title: response.data[i].name, parentId: response.data[i].parentId + "p", body: response.data[i].body, dataCreated: response.data[i].dateCreated, userId: response.data[i].userId }
                    if (response.data[i].parentId === 0) {
                        ob.parentId = response.data[i].spacesId
                    }
                    
                    AllList.push(ob);

                }
                AllTree = hierarchy(AllList, { idKey: 'key', parentKey: 'parentId' });

                rerenderfunction()


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
    const GetSpaces = () => {

        localStorage.getItem('token');

        axios.get(`Spaces/userId?userId=${userId}`, AuthHeader())
            .then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    let ob = { key: response.data[i].id, title: response.data[i].name, parentId: "" }
                    list.push(ob);
                    MySpaces.push(ob);
                }
                rerenderfunction();
                GetPages();

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


    const GetPages = () => {

        localStorage.getItem('token');
        axios.get(`Pages?userId=${userId}`, AuthHeader())
            .then((response) => {
                for (let i = 0; i < response.data.length; i++) {


                    let ob = { key: response.data[i].id + "p", title: response.data[i].name, parentId: response.data[i].parentId + "p", body: response.data[i].body, dataCreated: response.data[i].dateCreated }
                    MyPages.push(ob);
                    if (response.data[i].parentId === 0) {
                        ob.parentId = response.data[i].spacesId
                    }

                    list.push(ob);

                }
                tree = hierarchy(list, { idKey: 'key', parentKey: 'parentId' });

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


    const DeleteSpace = (spacesId) => {
        localStorage.getItem('token');

        axios.delete(`Spaces?id=${spacesId}&userId=${User.Id}`, AuthHeader())
            .then((response) => {

                if (response.data.status === "Success") {
                    message.success('Space was successfuly deleted');
                    setTimeout(function () {
                        history.push('/Home')
                        history.go(0);
                        
                    }, 500);
                }
                else {
                    message.error('Something gone wrong')
                }

            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    logout();
                } else if (error.request) {
                    message.error('Ooops something gone wrong ');
                } else {
                    message.error('Ooops something gone wrong ');
                }
            })
    }

    const onSelectTree = (key, object) => {
       
        
        if (window.location.pathname === '/' + object.node.title + object.node.key) {

        }
        else {
            history.push('/' + object.node.title + object.node.key);
            history.go(0);

        }


    }

    const onSelectAllTree = (key, object) => {

        
        if (object.node.body || object.node.body === "") {
            if (window.location.pathname === '/' + object.node.title + object.node.key) {

            }
            else {
                history.push('/' + object.node.title + object.node.key);
                history.go(0);

            }
        }


    }

    return (
        <Layout  >
            <div className="Sider" width={250} >
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '90%', borderRight: 0 }}
                >
                    <SubMenu key="sub1" icon={<FolderFilled />} title="My Spaces" >
                        {tree.map(tree => (
                            <>

                                <Button className="deleteButton" type='text' icon={<DeleteTwoTone twoToneColor="#f21115" />} style={{ marginBottom: 16 }} onClick={function () { DeleteSpace(tree.key) }} ></Button>

                                <SubMenu className="space" key={tree.title} icon={<CloudOutlined />} title={tree.title}>

                                    <Tree
                                        style={{ overflowX: 'auto' }}
                                        showIcon
                                        defaultExpandAll
                                        switcherIcon={<DownOutlined />}
                                        treeData={tree.children}
                                        icon={<FileTextTwoTone />}
                                        className="tree"
                                        onSelect={onSelectTree}
                                    />
                                </SubMenu>

                            </>
                        ))
                        }

                    </SubMenu>
                    <SubMenu key="sub2" icon={<FolderFilled />} title="Users Spaces" style={{ marginTop: 20 }}>
                        {AllTree.map(tree => (
                            <>
                                <Avatar size={27} src={tree.ImageUrl} style={{position: 'absolute', marginTop: 10,marginLeft:18}}  />
                                <SubMenu className="user" key={tree.title} style={{marginLeft:18}}  title={ <Router forceRefresh><NavLink style={{ textDecoration: 'none'}} to={"/UserProfile/" + tree.key}>{tree.title}</NavLink></Router>} >
                                    <Tree
                                        style={{ overflowX: 'auto' }}
                                        showIcon
                                        defaultExpandAll
                                        switcherIcon={<DownOutlined />}
                                        treeData={tree.children}
                                        icon={<FileTextTwoTone />}
                                        className="tree"
                                        onSelect={onSelectAllTree}
                                    />
                                </SubMenu>
                            </>
                        ))
                        }

                    </SubMenu>

                </Menu>
            </div>
            <div className="content">
                <Route exact path="/Home" render={() => <HomepageAuth user={User} pages={MyPages} />} />
                <Route exact path="/Myprofile" render={() => <UserProfile user={User} pages={MyPages} />} />
                <Route exact path="/EditProfile" render={() => <EditUserProfile user={User} />} />
                {AllTree.map(user => (
                    <Route exact path={"/UserProfile/" + user.key} render={() => <UserProfile user={user} pages={user.children.map(space =>(space.children))[0]} />} />
                ))}
                {MyPages.map(MyPages => (
                    <Route  exact path={'/' + MyPages.title + MyPages.key} render={() => <UserPage user={User} page={MyPages} />} />
                ))}

                {AllList.map(All => (
                    <Route  exact path={'/' + All.title + All.key} render={() => <UserPage page={All} MyData={User} />} />
                ))}

            </div>
        </Layout >
    )
}
