import { Layout, Col, Row, Empty, List, message } from 'antd';
import { FileTextTwoTone, CommentOutlined } from '@ant-design/icons';
import { React, useEffect } from 'react';
import './Homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { NavLink,  BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { rerenderfunction } from '..';
import { AuthHeader } from '../App';
import { logout } from './Authorization';
import { userId } from './AppMenuAuth';


const {Content} = Layout;


let AllPages = []
export let MyComments = []

export default function HomepageAuth(props) {




  const GetComment = () => {
    axios.get(`Comments?userId=${userId}`, AuthHeader())
      .then((response) => {

        for (let i = 0; i < response.data.length; i++) {
          console.log(response);
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




  useEffect(() => {
  
    localStorage.getItem('token');

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


  }, [])


  return (
    <Layout style={{ padding: '0 24px 24px' }}>

      <Content

        style={{
          padding: 24,
          margin: 0,
          minHeight: 885,


        }}
      >


        <Empty image="https://dbdzm869oupei.cloudfront.net/img/sticker/preview/837.png"
          imageStyle={{ height: 260, }}
          style={{ marginTop: 50 }}
          description={<h4 className="display-6"> Make use of your spaces and pages </h4>}
        />


        <Row gutter={[300, 100]}>

          <Col span={12}>
            <div className="text-center py-5" style={{ marginTop: 50 }}>
              <h4 className='Activity' >Pages Activity</h4>
            </div>
            {props.pages ?
              <>


                <List
                  className='list'
                  itemLayout='horizontal'
                  dataSource={props.pages}
                  style={{ textAlign: 'center' }}

                  renderItem={item => (
                    <List.Item style={{ marginTop: 30 }} >
                      <FileTextTwoTone className="file" style={{ position: 'absolute' }} />
                      <List.Item.Meta
                        title={<NavLink to={"/Myprofile"}>{props.user.title}</NavLink>}
                        description={'published'}
                        style={{ position: 'relative' }}
                      />
                      <h6 style={{ position: 'relative',marginRight:30 }}><Router forceRefresh><NavLink style={{ textDecoration: 'none' }} to={'/' + item.title + item.key} >{item.title}</NavLink></Router></h6>

                      <p style={{ position: 'relative', marginLeft: 20 }}>{item.dataCreated.substr(0, 10)}</p>

                    </List.Item>
                  )}
                />

              </>

              :
              null
            }
          </Col>
          <Col span={12}>
            <div className="text-center py-5" style={{ marginTop: 50 }}>
              <h4 className='Activity'>Comments Activity</h4>
            </div>
            {MyComments ?
              <>


                <List
                  className='listComment'
                  itemLayout='horizontal'
                  dataSource={MyComments}
                  style={{ textAlign: 'center' }}

                  renderItem={item => (
                    <List.Item style={{ marginTop: 30 }} >
                      <CommentOutlined className="file" style={{ position: 'absolute' }} />
                      <List.Item.Meta
                        title={<NavLink to={"/Myprofile"}>{props.user.title}</NavLink>}
                        description={'comments'}
                        style={{ position: 'relative' }}
                      />
                      <h6 style={{ position: 'relative',marginRight:30  }}><Router forceRefresh><NavLink style={{ textDecoration: 'none', color: '#ccaa16' }} to={'/' + item.title + item.pagesId} >{item.title}</NavLink></Router></h6>

                      <p style={{ position: 'relative', marginLeft: 20 }}>{item.dateCreated.substr(0, 10)}</p>

                    </List.Item>
                  )}
                />

              </>

              :
              null
            }
          </Col>
          
        </Row>

      </Content>
    </Layout>
  )
}