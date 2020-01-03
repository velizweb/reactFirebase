import React, { useState, useEffect } from "react";
import firebase from "./../config/fbConfig";
import { Button, Icon, Card, Row, Col, Table, Form, Input } from "antd";
import TaskLogic from "./TaskLogic";
import { withRouter } from "react-router-dom";
import "antd/dist/antd.css";

const db = firebase.firestore();

const TaskList = ({ form, history }) => {
  const { getFieldDecorator } = form;
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskName, setTaskName] = useState("");
  const [taskActive, setTaskActive] = useState({});

  const { saveTask, onDelete, onLogout } = TaskLogic(db, setTasks, form, firebase, history);

  const columns = [
    {
      title: "Táreas",
      dataIndex: "name",
      key: "name",
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <span className="table__crud__icons">
          {
            <>
              <Icon
                onClick={() => setTaskActive(record)}
                type="edit"
                className="icon icon__edit"
                theme="filled"
              />
              <Button type="link" onClick={() => onDelete(record.id)} size="small">
                <Icon type="delete" theme="filled" />
              </Button>
            </>
          }
        </span>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await db.collection("tasks").get();
        setTasks(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const formItemLayout = {
    labelCol: {
      xs: { span: 4 },
      sm: { span: 24 },
      md: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 20 },
      sm: { span: 24 },
      md: { span: 20 },
    },
  };

  const { id, name } = taskActive;

  return (
    <>
      <Row
        style={{
          height: "50px",
          backgroundColor: "#cdcdcd",
          marginBottom: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col span={19} style={{ fontSize: "18px"}}>App Test</Col>
        <Col span={3} offset={1}>
          <>
            <a type="dashed" icon="poweroff" size="large" onClick={() => onLogout()}>
              Logout
            </a>
          </>
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <Card title={"Formulario de Táreas"}>
            <Form {...formItemLayout}>
              <Form.Item label="Nombre">
                {getFieldDecorator("name", {
                  initialValue: name,
                  rules: [{ required: true, message: "Por favor escriba el nombre!" }],
                })(<Input placeholder="Nombre" onChange={e => setTaskName(e.target.value)} />)}
              </Form.Item>
              <div>
                <Button onClick={() => form.resetFields()}>Cancelar</Button>
                <Button
                  style={{ marginLeft: "5px" }}
                  onClick={() => saveTask(taskName, id)}
                  type="primary"
                >
                  Guardar
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
        <Col span={11} offset={1}>
          <Table columns={columns} dataSource={tasks} loading={loading} />
        </Col>
      </Row>
    </>
  );
};

export default withRouter(Form.create({ name: "task" })(TaskList));
