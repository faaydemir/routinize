import JustDate from "utils/just-date";

//TODO refactor constructors
class DateUnit {
  /**
   * @param  {Object} p
   * @param  {String} p.id
   * @param  {String} p.type
   * @param  {JustDate} p.start
   * @param  {JustDate} p.end
   */
  constructor({ id, type, start, end }) {
    this.id = id;
    this.type = type;
    this.start = start;
    this.end = end;
    this.range = this.end.diff(this.start);
  }

  toDoc() {
    return {
      id: this.id,
      type: this.type,
      end: this.end.date().getTime(),
      start: this.start.date().getTime()
    }
  }
  static fromDoc(doc) {
    return new DateUnit({
      id: doc.id,
      type: doc.type,
      start: new JustDate(new Date(doc.start)),
      end: new JustDate(new Date(doc.end))
    })
  }
  /**for obsolete firestore schema  */
  static obsolete() {
    return new DateUnit({
      id: null,
      type: null,
      start: new JustDate(),
      end: new JustDate()
    })
  }
}

/**
 * return time period units in given range 
 * @param  {string} timePeriod
 * @param  {JustDate} startDate
 * @param  {JustDate} endDate
 * @returns {Array.<DateUnit>}
 */
export const getTimeUnitsInRange = (timePeriod, startDate, endDate) => {
  const units = [];
  let dateIterate = startDate.clone();
  while (dateIterate <= endDate) {
    let end = dateIterate.endOf(timePeriod).next();
    if (end > endDate) end = endDate.next();
    const unit = new DateUnit({
      id: `${timePeriod}-${dateIterate.startOf(timePeriod).toString()}`,
      type: timePeriod,
      start: dateIterate.clone(),
      end: end.clone()
    },);

    dateIterate = end;
    units.push(unit);
  }
  return units;
};

export default DateUnit