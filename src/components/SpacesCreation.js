import { Radio, Input, Modal, Form, Button, message, TreeSelect } from 'antd';
import axios from 'axios';
import { React, useState } from 'react';
import { rerenderfunction } from '..';
import { logout } from './Authorization'
import { AuthHeader } from '../App';
import { useHistory } from 'react-router';
import { tree, userId } from './AppMenuAuth';


export let sCreationState = { visible: false, Response: null }

export let showModalCreate = () => {
    sCreationState.visible = true;
    rerenderfunction();
}

let input = "";

export default function SpacesCreation(props) {
    const [choice, setChoice] = useState("s"); 
    const [showTree, setShowTree] = useState(false);
    const [treeState, setTreeState] = useState(undefined);


    const handleOk = () => {
        sCreationState.visible = false;
        rerenderfunction();
    };

    const handleCancel = () => {
        sCreationState.visible = false;
        rerenderfunction();
    };

    const onPageHandler = () => {
        setShowTree(true);
    }
    const onSpaceHandler = () => {
        setShowTree(false);
    }

    let history = useHistory();

    
    const onChange = e => {
        setChoice(e.target.value);
    };
    
    const onTreeChange = value => {
        setTreeState({ value });
    }


    let body = [{ id: "XhybgOHCq2", type: "header", data: { text: "Hi", "level": 2 }, tunes: { anyTuneName: { alignment: "center" } } }, { id: "smtttTW7Tb", type: "paragraph", data: { text: "Here you can edit your page" }, tunes: { anyTuneName: { alignment: "center" } } }, {
        id: "KfWxhQFmHp", type: "image", data: {
            url: "data:image/png;base64,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" +
                "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" +
                "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", caption: "", withBorder: false, withBackground: false, stretched: false
        }
    }]

    var pageData = {
        Name: null, Body: body, UserId: userId, UserEditId: userId, SpacesId: null, ParentId: null
    }
    
    const CreateSpace = data => {

        localStorage.getItem('token');
        axios.post("Spaces", { name: data, userId: userId }, AuthHeader())
            .then((response) => {
                sCreationState.Response = response.data.status;
                if (sCreationState.Response === 'Success') {
                    message.success('Space was successfully created!');
                    handleOk();
                    setTimeout(function () {
                        history.go(0);
                    }, 500)
                }
                else {
                    message.error('Something went wrong. Check the correctness of entered data.');
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
    };

   

  

   

    const CreatePage = (pageName, pageBody, spacesId, parentId) => {
        localStorage.getItem('token');
        axios.post("Pages", {
            Name: pageName, Body: JSON.stringify(pageBody), UserId: userId, userEditId: userId,
            SpacesId: spacesId, ParentId: parentId
        }, AuthHeader())
            .then((response) => {
                sCreationState.Response = response.data.status;
                if (sCreationState.Response === 'Success') {
                    message.success('Page was successfully created!');
                    handleOk();
                    setTimeout(function () {
                        history.go(0);
                    }, 500)
                }
                else {
                    message.error('Something went wrong. Check the correctness of entered data.');
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
            });
    }

   

    const onSubmitHandler = e => {
        if (choice === "s") {
            CreateSpace(input);
        }
        else if (choice === "p") {

            if(!treeState){
                
            }

            else if (treeState.value.toString().slice(-1) === "p") {
                pageData.SpacesId = 0;
                pageData.ParentId = treeState.value.toString().substring(0, treeState.value.toString().length - 1);
            }
            else {
                pageData.SpacesId = treeState.value;
                pageData.ParentId = 0;
            }
            pageData.Name = input;
            pageData.UserId = pageData.UserEditId = userId;
            CreatePage(pageData.Name, pageData.Body, pageData.SpacesId, pageData.ParentId);
        }
        else{
            message.error('Ooops something gone wrong')
        }
    }


  


    return (
        <div>
            <Modal title="What do you want to create?"
                visible={sCreationState.visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[

                ]}>
                <Form
                    name="newspaceorpage"
                >
                    <Radio.Group onChange={onChange} buttonStyle="solid"
                        style={{ marginBottom: 32 }} value={choice}>
                        <Radio.Button value="s" onClick={onSpaceHandler}>Space</Radio.Button>
                        <Radio.Button value="p" onClick={onPageHandler}>Page</Radio.Button>
                    </Radio.Group>

                    <Form.Item label="New name:" rules={[
                        {
                            required: true,
                        },
                    ]}>

                        <Input onChange={e => input = e.target.value} /*disabled={!inputState}*/ />

                    </Form.Item>
                    {
                        showTree ?
                            <Form.Item>
                                <TreeSelect
                                    placeholder="Please select parent space/page for your new page"
                                    treeData={tree}
                                    onChange={onTreeChange}
                                    value={treeState}
                                >
                                </TreeSelect>
                            </Form.Item> :
                            null
                    }
                    <Form.Item style={{ marginTop: 32, marginLeft: 384, marginBottom: 0 }}>
                        <Button type="primary" htmlType="submit" onClick={onSubmitHandler}>Submit</Button>
                    </Form.Item>

                </Form>
            </Modal>
        </div>

    );
};