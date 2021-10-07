import { Comment, Avatar, Form, Button, message, Input } from 'antd';
import axios from 'axios';
import { rerenderfunction } from '..';
import { userId } from './AppMenuAuth';
import React from 'react'
import { logout } from './Authorization'
import { AuthHeader } from '../App';
import { useHistory } from 'react-router';




const { TextArea } = Input;

export let sCreationState = { visible: false, Response: null }




let CommentBody;
let input
export default function CreateComments(props) {

  let history = useHistory();

  let submitting;

  const Editor = ({ onChange, onSubmit, submitting }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={input} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </>
  );

  const handleOk = () => {
    sCreationState.visible = false;
    rerenderfunction();
  };




  const CreateComment = data => {
  
    localStorage.getItem('token');
    axios.post("Comments", { body: data, UserId: userId, PagesId: props.pageId }, AuthHeader())
      .then((response) => {
        if (response.data.status != null) {
          message.success('Comment was successfully created!');
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
  const OnSubmitHandler = e => {
    submitting = true;
    CommentBody = input;
    CreateComment(CommentBody);
  }


  return (
    <>
      <Comment
        style={{ marginTop: 200 }}
        avatar={
          <Avatar
            src={props.ImageUrl}
            style={{ marginTop: 30 }}
          />
        }
        content={
          <Editor
            onChange={e => input = e.target.value}
            onSubmit={OnSubmitHandler}
            submitting={submitting}
          />
        }
      />
    </>
  );
}