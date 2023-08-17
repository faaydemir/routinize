import BaseStore from "storage/base-store"
import Task from "model/task";
import { getUser } from "core/firebase/auth/session";
import { addDoc, collection, doc, documentId, getDocs, query, setDoc, where } from "firebase/firestore";
import _ from "lodash";
import getDataFromResponse from "core/firebase/firestore-util";
/* eslint-enable no-unused-vars */
class TaskStore extends BaseStore {

  async getUserId() {
    const user = await getUser();
    const userId = user.uid;
    return userId;
  }

  
  /**
   * @param  {Task} task
   */
  async add(task) {
    task.userId = await this.getUserId();

    const response = await addDoc(
      collection(this.db, `users/${task.userId}/task`),
      task.toDoc()
    );
    task.id = response.id;
    return response
  }

  /**
  * @param  {Task} task
  * @returns {Promise<void>}
  */
  async update(task) {
    task.userId = await this.getUserId();

    await setDoc(
      doc(this.db, `users/${task.userId}/task`, task.id),
      task.toDoc(),
      { merge: true }
    );
  }


  /**
  * @param  {String} taskId
  * @returns {Promise<void>}
  */
  async updateProps(taskId, props) {
    const userId = await this.getUserId();
    await setDoc(
      doc(this.db, `users/${userId}/task`, taskId),
      { ...props },
      { merge: true }
    );
  }


  /**
   * @returns {Promise<Array<Task>>}
   */
  async getActiveTasks() {
    const userId = await this.getUserId();
    const getTasksQuery = query(
      collection(this.db, `users/${userId}/task`),
      where("isDeleted", "==", false), where("isCompleted", "==", false)
    );
    const data = getDataFromResponse(
      await getDocs(getTasksQuery)
    )
    return _.isEmpty(data)
      ? []
      : data.map(d => Task.fromDoc(d));
  }


  /**
   * @param {Array<string>} taskIds
   * @returns {Promise<Array<Task>>}
   */
  async getTasksById(taskIds) {
    if (_.isEmpty(taskIds)) return [];

    const userId = await this.getUserId();
    const getTasksQuery = query(
      collection(this.db, `users/${userId}/task`),
      where("isDeleted", "==", false), where(documentId(), "in", taskIds),
    );
    const data = getDataFromResponse(
      await getDocs(getTasksQuery)
    )
    return _.isEmpty(data)
      ? []
      : data.map(d => Task.fromDoc(d));
  }
}

const taskStore = new TaskStore()
export default taskStore;
