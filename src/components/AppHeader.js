import 'antd/dist/antd.css'
import { Layout, Button, Col, Row } from 'antd';
import { UserOutlined, HomeOutlined, FileOutlined } from '@ant-design/icons';
import React from 'react';
import './AppHeader.css';
import { showModel } from './Authorization';





export default function AppHeader(props) {

  return (
    <Layout>
      <Row>

        <Col span={8}>
          <Button block icon={<HomeOutlined />} >
            Home page
          </Button>
        </Col>

        <Col span={8}>
          <Button block disabled size={43} icon={<FileOutlined />} >
            Create
          </Button>
        </Col>


        <Col span={8} color={'white'}>
          <Button type="primary" block icon={<UserOutlined />} onClick={showModel} >
            Authorization
          </Button>
        </Col>


      </Row>

    </Layout>

  )
}

