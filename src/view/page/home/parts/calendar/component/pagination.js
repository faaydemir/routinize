import React from 'react'
import IconButton from 'view/component/icon-button';
import { TIME_PERIODS } from 'utils/just-date';

const Pagination = ({
    calendarPeriod,
    onCalendarPeriodChanged,
    onNextClicked,
    onPreviousClicked,
    onNowClicked
}) => {

    return (
        <div className="flex-row calendar-pagination">
            <div className="flex-row">
                <button
                    className={`button-navigation${calendarPeriod === TIME_PERIODS.WEEK ? ' button-active' : ''}`}
                    onClick={() => onCalendarPeriodChanged(TIME_PERIODS.WEEK)}>
                    week
                </button>
                <button
                    className={`button-navigation${calendarPeriod === TIME_PERIODS.MONTH ? ' button-active' : ''}`}
                    onClick={() => onCalendarPeriodChanged(TIME_PERIODS.MONTH)}>
                    month
                </button>
            </div>

            <div className="flex-row">
                <button
                    className="button-navigation"
                    onClick={() => onNowClicked()}>
                    Now
                </button>
                <IconButton
                    className="button-navigation button-icon"
                    icon="navigate_before"
                    onClick={() => onPreviousClicked()}
                ></IconButton>
                <IconButton
                    className="button-navigation button-icon"
                    icon="navigate_next"
                    onClick={() => onNextClicked()}
                ></IconButton>
            </div>
        </div>
    );
};

export default Pagination