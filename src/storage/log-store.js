import BaseStore from "storage/base-store"
import { getDataFromResponse } from "core/firebase/firestore-util";
import DateLog from "model/date-log";

import { collection, doc, getDocs, or, query, setDoc, where } from "firebase/firestore";
import _ from "lodash";
/* eslint-enable no-unused-vars */
class DateLogStore extends BaseStore {

  /**
   * adds new log to firestore
   * @param {string} logId 
   * @param {Object} props 
   * @returns {Promise<void>}
   */
  async updateProps(logId, props) {
    const userId = await this.getUserId();

    await setDoc(
      doc(this.db, `users/${userId}/log`, logId),
      { userId, ...props }
    );
  }

  /**
   * @param  {Date} start
   * @param  {Date} end
   * @returns {Promise<Array<DateLog>>}
   */
  async getLogsInRange(start, end) {
    const userId = await this.getUserId();

    const filterByStart = query(
      collection(this.db, `users/${userId}/log`),
      where("end", ">=", start.getTime()), where("end", "<=", end.getTime())
    );

    const filterByEnd = query(
      collection(this.db, `users/${userId}/log`),
      where("start", ">=", start.getTime()), where("start", "<=", end.getTime())
    );

    const [responseByStartFilter, responseByEndFilter] = await Promise.all(
      [
        getDocs(filterByStart),
        getDocs(filterByEnd),
      ]
    );
    const logs = _.uniqBy(
      [
        ...getDataFromResponse(responseByStartFilter),
        ...getDataFromResponse(responseByEndFilter)
      ],
      'id'
    );

    if (!_.isEmpty(logs)) {
      return logs.map(d => DateLog.fromDoc(d));
    } else {
      return []
    }
  }
}

const logStore = new DateLogStore()
export default logStore;
