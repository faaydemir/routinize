import React, { useEffect } from "react";
import JustDate, { TIME_PERIODS } from "utils/just-date";
import { loadCurrentCalendar, logTaskProgress, editTask, loadNextCalendar, loadPreviousCalendar, changeCalendarPeriod } from "view/page/home/actions";
import { useStatefy } from "core/statefy";
import calendarState from "state/calendar";
import "./style.scss";
import Header from "view/page/home/parts/calendar/component/header";
import TaskColumn from "view/page/home/parts/calendar/component/task-column";
import Pagination from "view/page/home/parts/calendar/component/pagination";

const Calendar = ({ }) => {
  /**@type {{calendar:import("model/calendar").default,calendarPeriod:string,startOfCalendar:JustDate}} */
  const { calendar, calendarPeriod, startOfCalendar } = useStatefy(calendarState);

  useEffect(() => {
    loadCurrentCalendar({ startOfCalendar, calendarPeriod })
  }, []);

  const getHeaderForCalendar = () => {
    if (!startOfCalendar || !calendarPeriod) return "";
    switch (calendarPeriod) {
      case TIME_PERIODS.WEEK:
        return `${startOfCalendar.week()}. week of ${startOfCalendar.year()}`;
      case TIME_PERIODS.MONTH:
        return `${startOfCalendar.monthName()} - ${startOfCalendar.year()}`;
      default:
        return "invalid-period";
    }
  }

  return (
    <>
      <main className="calendar-container">
        <h4 className="calendar-header">{getHeaderForCalendar()}</h4>
        <div className="calendar-mid">
          <div className="calendar-main">

            {(calendar && calendar.activities && calendar.activities.length > 0)

              ? <>
                <Header days={calendar.days} />

                {
                  calendar.activities.map(
                    activity => (
                      <TaskColumn
                        key= {activity.task.id}
                        header={activity.task.title}
                        color={activity.task.color}
                        taskLogs={activity.logs}
                        onHeaderClick={() => editTask(activity.task)}
                        onTaskChecked={(log) => logTaskProgress({ log })}
                      />)
                  )
                }

                <Pagination
                  calendarPeriod={calendarPeriod}
                  onCalendarPeriodChanged={async (calendarPeriod) => await changeCalendarPeriod({ startOfCalendar, calendarPeriod })}
                  onNowClicked={async () => await loadCurrentCalendar({ calendarPeriod })}
                  onNextClicked={async () => await loadNextCalendar({ calendarPeriod, startOfCalendar })}
                  onPreviousClicked={async () => await loadPreviousCalendar({ calendarPeriod, startOfCalendar })}
                />
              </>
              :
              <span className="warning-message">No tasks have been added yet.</span>
            }
          </div>
        </div>
      </main>
    </>
  );
};

export default Calendar;
