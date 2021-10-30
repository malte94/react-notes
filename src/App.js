import { useState } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Row, Col, Form, Input, message, Button, Space } from 'antd';
import dayjs from 'dayjs';

const { TextArea } = Input;

function App() {

  const [formValues, setFormValues] = useState([]);
  const [form] = Form.useForm();
  const [updateNow, setUpdateNow] = useState(true)

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

  const onFinish = () => {
    submit();
    message.success('Submit success!');
  };

  const handleChange = (e) => {
    setFormValues(prevState => ({ ...prevState, [e.target.id]: e.target.value }));
  }

  const drawNotes = () => {
    let html = [];
    let jsonNotes = JSON.parse(localStorage.getItem('react-notes-notes'));
    try {
      for (let note of jsonNotes) { 
          html = [...html,
          <div key={note.title} className="note">
            <h2>{note.title}</h2>
            <p>{note.message}</p>
            <i>{note.date}</i>
          </div>
          ]
        } 
        return html;
      } catch {
        return;
      }
  }

  const submit = () => {
    let now = dayjs(); 
    let jsonNotes = JSON.parse(localStorage.getItem('react-notes-notes'));
    if (jsonNotes == null) { jsonNotes = [] }

    jsonNotes.push({
      title: formValues.title,
      message: formValues.message,
      date: now.format("DD.MM.YYYY / HH:mm:ss")
    });

    console.log("Submitted Notes: ");
    console.log(jsonNotes);

    localStorage.setItem("react-notes-notes", JSON.stringify(jsonNotes));

    setUpdateNow(!updateNow);
  }

  return (
    <div className="App">
      <Row gutter={[16, 16]}>
        <Col className="col-heading" span={14}>
          <h1>My notes</h1>
          {drawNotes()}
        </Col>
        <Col className="col-form" span={8}>
          <h1>Create a note</h1>
          <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
            <div style={{ overflow: 'hidden' }}>
            <Form.Item name="title" label="Title" onChange={(e) => handleChange(e)} rules={[
                  { required: true },
                  { type: 'string', warningOnly: true },
                  { type: 'string', min: 4 },
                ]}>
                <Input placeholder="Title" />
              </Form.Item>
              <Form.Item name="message" label="Note" onChange={(e) => handleChange(e)} rules={[
                  { required: true },
                  { type: 'string', warningOnly: true },
                  { type: 'string', min: 4 },
                ]}>
                <TextArea placeholder="Note" />
              </Form.Item>
            </div>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default App;
