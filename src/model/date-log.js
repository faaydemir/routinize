import logStore from "storage/log-store";
import TaskProgress from "./task-progres";
import { PROGRESS_TYPE } from "model/enums";
import DateUnit from "model/date-unit";

export default class DateLog {


  constructor({ taskId, unit, progress, isLocked = false }) {
    this.taskId = taskId;
    this.unit = unit;
    this.userId = null;
    this.isLocked = isLocked
    this.id = this.getLogKey();
    this.createDate = Date.now();
    this.progress = progress;
  }

  hasSubTask() {
    return this.progress.progressType === PROGRESS_TYPE.SUB_TASK;
  }

  isDone() {
    return this.progress.progressState
  }

  toDoc() {
    return {
      taskId: this.taskId,
      progress: this.progress.toDoc(),
      unit: this.unit.toDoc(),
      createDate: this.createDate,
      start: this.unit.start.date().getTime(),
      end: this.unit.end.date().getTime()
    };
  }

  /**
   * return unique key for log
   * key consist of task key and date unit key
   * there must ne only one log for a date unit
   */
  getLogKey() {
    return `${this.taskId}_${this.unit.id}`;
  }

  progressNext() {
    this.progress.gotoNextState();
  }

  progressSubTaskNext(subTask) {
    this.progress.gotoNextSubState(subTask);
  }
  
  async save() {
    await logStore.updateProps(this.id, this.toDoc())
  }
  
  static create({ taskId, progressType, unit, stepCount, subTasks, isLocked = false }) {
    const progress = new TaskProgress({
      progressType,
      stepCount,
      subTasks
    });
    return new DateLog({ taskId, unit, progress, isLocked })
  }
  
  static fromDoc(doc) {
    const progress = TaskProgress.fromDoc(doc.progress);
    const unit = doc.unit ? DateUnit.fromDoc(doc.unit) : DateUnit.obsolete();
    const log = new DateLog({
      taskId: doc.taskId,
      progress: progress,
      unit: unit
    });
    return log;
  }
}
