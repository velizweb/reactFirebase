import { message } from "antd";
import firebase from "./../config/fbConfig";

/**
 * @param {Object} form, https://ant.design/components/form/?locale=en-US#header
 */
const useFormLoginLogic = ( form, history) => {
  /**
   * Login.
   * @param {Object} e, Event triggered by the form.
   */
  const onSubmit = e => {
    e.preventDefault();

    form.validateFields(async (err, { email, password }) => {
      if (err) return;
      message.loading("Verificando Usuario...");
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          message.destroy();
          history.push("/");
        })
        .catch(error => {
          message.destroy();
          message.warning("Usuario o Clave incorrecta")
        });
    });
  };

  const { getFieldDecorator } = form;

  return { onSubmit, getFieldDecorator };
};

export default useFormLoginLogic;
