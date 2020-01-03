import React from "react";
import { Form, Icon, Input, Button } from "antd";
import useFormLoginLogic from "./LoginLogic";
import { withRouter } from "react-router-dom";

/**
 * @param {Object} form, https://ant.design/components/form/?locale=en-US#header
 */
const FormLogin = ({ form, history }) => {
  const { onSubmit, getFieldDecorator } = useFormLoginLogic(form, history);

  return (
    <div className="login__container">
      <div>
        <h4 className="login__container__h4">Inicio de sesión</h4>
      </div>
      <Form onSubmit={onSubmit}>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Por favor indique su username!" }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
              autoComplete="username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Por favor indique su Password!" }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button className="login__container__form__button" type="primary" htmlType="submit">
            Iniciar Sesión
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default withRouter(Form.create({ name: "normal_login" })(FormLogin));
