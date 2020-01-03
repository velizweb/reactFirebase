import { message } from "antd";

const TaskLogic = (db, setTasks, form, firebase, history) => {
  const saveTask = async (name, id) => {
    message.loading("Guardando....");
    try {
      if (id) {
        await db
          .collection("tasks")
          .doc(id)
          .set({ name });
      } else {
        await db.collection("tasks").add({ name });
      }

      message.destroy();
      const data = await db.collection("tasks").get();
      setTasks(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async task => {
    message.loading("Eliminando....");
    try {
      await db
        .collection("tasks")
        .doc(task)
        .delete();
      const data = await db.collection("tasks").get();
      setTasks(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      message.destroy();
    } catch (error) {
      console.log(error);
    }
  };

  const onLogout = async () => {
    message.loading("Gracias por visitarnos....");
    firebase.auth().signOut();
    history.push("/login");
  }

  return { saveTask, onDelete, onLogout };
};

export default TaskLogic;
