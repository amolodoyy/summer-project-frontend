import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import NestedList from '@editorjs/nested-list';
import Embed from '@editorjs/embed';
import { Layout, Button, Breadcrumb, message, Card, Avatar, List, Comment, Modal } from 'antd';
import { DeleteTwoTone} from '@ant-design/icons';
import Alert from 'editorjs-alert';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { AuthHeader } from '../App';
import { logout } from './Authorization'
import { rerenderfunction } from '..';
import { MySpaces, AllTree, AllList } from './AppMenuAuth';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Comments from './CreateComments'
import avatar from '../images/avatar.gif';
import './UserPage.css';

const Table = require('editorjs-table');
const Paragraph = require('@editorjs/paragraph');
const AlignmentTuneTool = require('editorjs-text-alignment-blocktune');
const Marker = require('@editorjs/marker');
const Delimiter = require('@editorjs/delimiter');
const Checklist = require('@editorjs/checklist');
const SimpleImage = require('@editorjs/simple-image');
const { Content } = Layout;
const { Meta } = Card;

let spaceName;
let username;
let userAvatar;
export let list = [];
export let MyComments = [];
let Allusers = [];







class UserPage extends React.Component {
  state = { visible: false };




  DeleteComment = (commentsId, userId) => {
    localStorage.getItem('token');
    axios.delete(`Comments?id=${commentsId}&userId=${userId}`, AuthHeader())
      .then((response) => {
        if (response.data.status === "Success") {   
          message.success('Comment was successfuly deleted');
          setTimeout(function () { window.location.reload(); }, 500);
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

  GetComment = (pagesid) => {

    localStorage.getItem('token');
    axios.get(`Comments/${pagesid.split('p').join("")}?pageid=${pagesid.split('p').join("")}`, AuthHeader())
      .then((response) => {
        if (response === null) {
          message.error('Ooops something gone wrong ');
        }
        for (let i = 0; i < response.data.length; i++) {
          let ob = { key: response.data[i].id, pagesId: response.data[i].pagesId + "p", body: response.data[i].body, dateCreated: response.data[i].dateCreated, userId: response.data[i].userId, imageUrl: null, isDelete: false }

          if (this.props.user) {
            ob.isDelete = true;
          }
          else if (this.props.MyData.Id === ob.userId) {
            ob.isDelete = true;
          }
          else {
            ob.isDelete = false;
          }
          for (let i = 0; i < Allusers.length; i++) {
            if (Allusers[i].key === ob.userId) {
              ob.title = Allusers[i].title
              ob.imageUrl = Allusers[i].ImageUrl
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



  SaveChanges = () => {

    this.editor.save().then((outputdata) => {
      debugger;
      localStorage.getItem('token');
      axios.put(`Pages/EditPageBody?pageId=${this.props.page.key.split('p').join("")}`, { body: JSON.stringify(outputdata.blocks) }, AuthHeader())
        .then((response) => {
          console.log(response)
          if (response.data != null) {
            message.success("Сhanges were successfully accepted ")
            
          }
          else{
            message.error('Ooops something gone wrong ');
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




    })

  }

  DeletePage = () => {

    this.setState({
      visible: false,
    });
    localStorage.getItem('token');

    axios.delete(`Pages?id=${this.props.page.key.split('p').join("")}&userId=${this.props.user.Id}`, AuthHeader())
      .then((response) => {

        if (response.data.status === "Success") {
          message.success('Page was successfuly deleted');
          setTimeout(function () {
            window.location.reload();
            window.location.assign('/Home')
          }, 500);
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


  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };



  componentDidMount() {

    localStorage.getItem('token');

    axios.get('api/UserProfile/GetAllUsers', AuthHeader())
      .then((response) => {

        for (let i = 0; i < response.data.length; i++) {

          let ob = { key: response.data[i].id, title: response.data[i].firstName + ' ' + response.data[i].lastName, parentId: "", ImageUrl: response.data[i].path, Email: response.data[i].email }
          if (ob.ImageUrl === '1') {
            ob.ImageUrl = avatar;
          }
          Allusers.push(ob);
        }
        this.GetComment(this.props.page.key);

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

    if (!this.props.user) {
      document.getElementById('editorjs').style = 'pointer-events: none';
    }
    for (let i = 0; i < AllList.length; i++) {

      if (MyComments.userId === AllList[i].key) {
        MyComments.imageUrl = AllList[i].ImageUrl;
      }
    }

    for (let i = 0; i < MySpaces.length; i++) {

      if (this.props.page.parentId === MySpaces[i].key) {
        spaceName = MySpaces[i].title;
      }
    }
    for (let i = 0; i < AllList.length; i++) {

      if (this.props.page.parentId === AllList[i].key) {
        spaceName = AllList[i].title;
      }
    }
    

    for (let i = 0; i < AllTree.length; i++) {

      if (this.props.page.userId === AllTree[i].key) {
        username = AllTree[i].title;
        userAvatar = AllTree[i].ImageUrl;

      }
    }



  }
  editor = new EditorJS({

    holder: 'editorjs',

    data: {
      blocks: JSON.parse(this.props.page.body),
      version: "2.22.2"
    },


    tools: {
      table: Table,
      header: {
        class: Header,
        tunes: ['anyTuneName'],
        inlineToolbar: true
      },
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        tunes: ['anyTuneName'],
      },
      list: {
        class: NestedList,
        inlineToolbar: true
      },
      embed: {
        class: Embed,
        config: {
          services: {
            youtube: true,
            coub: true
          }
        }
      },
      checklist: {
        class: Checklist,
        inlineToolbar: true,
      },
      image: SimpleImage,
      delimiter: Delimiter,
      alert: Alert,
      Marker: {
        class: Marker,
        shortcut: 'CMD+SHIFT+M',
      },
      anyTuneName: {
        class: AlignmentTuneTool,
        config: {
          default: "right",
          blocks: {
            header: 'center',
            list: 'right'
          }
        },
      },


    },
  })



  render() {
    return (
      <Content style={{

        margin: 0,
        minHeight: 885,
        textAlign: 'center',
        padding: 30,
        paddingLeft: 250,
        paddingRight: 250
      }}>

        <Breadcrumb style={{ paddingBottom: 20 }}>
          <Breadcrumb.Item ><NavLink to="/Home" ><span>Home</span></NavLink></Breadcrumb.Item>
          {this.props.user ? <Breadcrumb.Item ><span>My Spaces</span></Breadcrumb.Item> : <Breadcrumb.Item ><span>Users Spaces</span></Breadcrumb.Item>}
          <Breadcrumb.Item ><span>{spaceName}</span></Breadcrumb.Item>
          <Breadcrumb.Item>{this.props.page.title}</Breadcrumb.Item>

        </Breadcrumb>

        <Modal
          title="Delete Page"
          visible={this.state.visible}
          onOk={this.DeletePage}
          onCancel={this.hideModal}
          okText="Delete"
          cancelText="Cancel"
        >
          <p>Are you sure you want to delete the page?</p>

        </Modal>
        {this.props.user ?
          <Card
          style={{ width: 250, height: 100, position: 'relative', marginBottom: 10 }}
          className="card"
        >
          {this.props.user ?
            <Meta
              avatar={
                <Avatar src={this.props.user.ImageUrl} />
              }
              title={this.props.user.title}
              description={' Was published: ' + this.props.page.dataCreated.substr(0, 10)}

            />
            :
            <Meta
              avatar={
                <Avatar src={userAvatar} />
              }
              title={username}
              description={' Was published: ' + this.props.page.dataCreated.substr(0, 10)}

            />
          }
        </Card>
          : <Card
            style={{ width: 250, height: 100, position: 'relative', marginBottom: 10 }}
            className="card"
          >
            {this.props.user ?
              <Meta
                avatar={
                  <Avatar src={this.props.user.ImageUrl} />
                }
                title={this.props.user.title}
                description={' Was published: ' + this.props.page.dataCreated.substr(0, 10)}

              />
              :
              <Meta
                avatar={
                  <Avatar src={userAvatar} />
                }
                title={username}
                description={' Was published: ' + this.props.page.dataCreated.substr(0, 10)}

              />
            }
          </Card>}



        {this.props.user ? <Button className="deleteButton" type='text' icon={<DeleteTwoTone twoToneColor="#f21115" />} style={{ position: 'relative', marginRight: 900 }} onClick={this.showModal}  ></Button> : null}
        <div id='editorjs'></div>


        {this.props.user ? <Button type='primary' style={{ marginTop: 30 }} onClick={this.SaveChanges} >Save Changes</Button> : null}

        <List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={MyComments}
          style={{ marginTop: 50 }}
          renderItem={item => (
            <li>
              {item.isDelete ? <Button className="deleteButton" type='text' icon={<DeleteTwoTone twoToneColor="#f21115" />} style={{ position: 'absolute', marginLeft: 430, marginTop: 10 }} onClick={() => { this.DeleteComment(item.key, item.userId) }} ></Button> : null}
              <Comment
                className="Comment"
                style={{ marginTop: 50 }}
                actions={item.actions}
                author={item.title}
                avatar={
                  <Avatar
                    src={item.imageUrl}

                  />
                }
                content={item.body}
                datetime={item.dateCreated.substr(0, 10)}
              />
            </li>
          )}
        />

        {this.props.user ? <Comments pageId={this.props.page.key.split('p').join("")} ImageUrl={this.props.user.ImageUrl} /> : <Comments pageId={this.props.page.key.split('p').join("")} ImageUrl={this.props.MyData.ImageUrl} />}
      </Content>



    )
  }
}




export default UserPage
