import React from "react";

const DayBox = ({ day, isFocus }) => {
    return (
        <div className={`box box-1-1`}>
            <div className={`day-header${isFocus ? " today-focus" : ""}`}>
                <span className="day-index-string">{day.start._day}</span>
                <span className="day-name-string" >{day.start.dayName().substring(0, 3).toLowerCase()}</span>
            </div>
        </div>
    );
};

const Header = ({ days, onItemClick = undefined }) => {
    return (
        <div className="calendar-column header-column">
            <div className="box-3-1 header-placeholder"></div>
            <div className="calendar-units flex-row">
                {days && days.map((d) => (
                    <DayBox
                        key= {d.id}
                        day={d}
                        isFocus={d.start.isToday()}
                    ></DayBox>
                ))}
            </div>
        </div>
    );
};

export default Header;