import { Layout, Menu, Empty } from 'antd';
import { React} from 'react';
import './AppMenu.css';
import emptyCloud from '../images/emptyCloud.jpg';
import Homepage from './Homepage';

const { Sider } = Layout;


export default function AppMenu(props) {



    return (
        <Layout>
            <Sider className="Sider" width={200} >
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <Empty className="EmptyMenu" description="Please log in to use your spaces" image={emptyCloud} />
                </Menu>
            </Sider>
            <Homepage />
        </Layout>
    )
}