// import faker from "faker";

// const PROGRESS_STATE = { notSet: 1, done: 2, partialDone: 3, notDone: 4 };
// const TodoIntervals = { day: "day", week: "week", month: "month", quarter: "quarter", year: "year" };
// const PROGRESS_TYPE = { single: "single", stepped: "2", subTask: 3 };
// class DateUnit {
//   constructor() {
//     this.from = faker.date.between("2020-01-01", "2020-01-05");
//     this.to = faker.date.between("2020-02-01", "2021-02-05");
//     this.type = faker.random.number(1, 5);
//     this.id = "";
//     this.definition = this.getDefinition();
//   }
//   getDefinition() {
//     return this.type + "-" + this.from
//   }
// }
// class TaskLog {
//   constructor() {
//     this.task = new Task();
//     this.unit = new DateUnit();
//     this.state = new TaskState();
//   }
// }
// class TaskState {
//   constructor() {
//     this.type = null;
//     this.state = faker.random.number(4);
//     this.stepCount = faker.random.number(10);
//     this.progressType = faker.random.number(1, 3);
//     this.completedStepCount = Math.round(this.stepCount * Math.random());
//     this. subTaskProgress = {
//     }
//   }
// }
// class Task {
//   constructor() {
//     this.id = faker.random.uuid();
//     this.title = faker.lorem.words(2);
//     this.description = faker.lorem.words(15);
//     this.interval = faker.random.number(1, 5);
//     this.priority = faker.random.number(1, 4);
//     this.type = faker.random.number(1, 2);
//     this.from = faker.date.between("2020-01-01", "2020-01-05");
//     this.to = faker.date.between("2020-02-01", "2021-02-05");
//     this.date = faker.date.between("2020-01-01", "2021-01-05");
//   }
// }

// class TodoState {
//   constructor(todoId, unit) {
//     this.todoId = todoId || faker.random.uuid();
//     this.id = faker.random.uuid();
//     this.state = faker.random.number(1, 4);
//     this.unit = unit || new DateUnit();
//     this.range = 1;
//   }
// }

// class TodoCalendar {
//   constructor(todo, dateStates) {
//     this.todo = todo || new Todo();
//     this.states = dateStates || generate(30, TodoState, this.todo.id);
//   }
// }
// class Calendar {
//   constructor(todo, dateStates) {
//     this.unitType = "day";
//     this.todos = [];
//     this.days = [];
//   }
// }
// class Todo {
//   constructor() {
//     this.id = faker.random.uuid();
//     this.title = faker.lorem.words(2);
//     this.description = faker.lorem.words(15);
//     this.interval = faker.random.number(1, 5);
//     this.priority = faker.random.number(1, 4);
//     this.type = faker.random.number(1, 2);
//     this.from = faker.date.between("2020-01-01", "2020-01-05");
//     this.to = faker.date.between("2020-02-01", "2021-02-05");
//     this.date = faker.date.between("2020-01-01", "2021-01-05");
//   }
// }
// function generate(count, type, args) {
//   const mocks = [];
//   for (let i = 0; i < count; i++) {
//     mocks.push(new type(args));
//   }
//   return mocks;
// }
// export {
//   TodoState,
//   Calendar,
//   Todo,
//   DateUnit,
//   TaskState,
//   TaskLog,
//   generate,
//   TodoCalendar,
//   PROGRESS_TYPE,
//   PROGRESS_STATE,
//   TodoIntervals
// };
