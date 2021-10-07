import { React} from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { rerenderfunction } from '../..';


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
export let state = {
  imageUrl: null,
  loading: false,
  file: null,
};

export default function ChangeAvatar() {
  

  let handleChange = info => {
    if (info.file.status === 'uploading') {;
      state.loading = true;
      rerenderfunction();
      return;
    }
    if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, imageUrl =>
        state.imageUrl = imageUrl,

      );
    
    
      state.loading = false;
     setTimeout(function(){ rerenderfunction()},100);
      
    }
  };




  const uploadButton = (
    <div>
      {state.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )


  return (
    <div>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {state.imageUrl ? null : uploadButton}
      </Upload>
      {state.imageUrl ? <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 180, xxl: 180 }} src={state.imageUrl} /> : null}

    </div>
  );

}
