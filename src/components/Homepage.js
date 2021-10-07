import { Layout, Empty,Button} from 'antd';
import { React } from 'react';
import './Homepage.css';
import {showModel} from './Authorization';

const { Content } = Layout;

export default function Homepage(props) {



  return (
    <Layout style={{ padding: '0 24px 24px' }}>

      <Content

        style={{
          padding: 24,
          margin: 0,
          minHeight: 885,


        }}
      >

        

        <Empty
          image="https://image.flaticon.com/icons/png/512/942/942830.png"
          imageStyle=
          {{
            height:130,
                       
          }}
          description={
            <span>
              Log in to look through your pages
            </span>
          }
        >
          <Button type="primary" onClick ={showModel}>Log in now</Button>
        </Empty>
      </Content>
    </Layout>
  )
}