import { DateTime } from 'luxon'

export default class DateTimeWrapper {

  constructor({ locale = 'en-GB', text, timeZone = 'utc' } = {}) {
    this.dateTime = DateTime.fromISO(text, { locale, zone: timeZone })
  }

  getShortDate() {
    return this.dateTime.toLocaleString(DateTime.DATE_SHORT)
  }

  get24Time() {
    return this.dateTime.toLocaleString(DateTime.TIME_24_SIMPLE)
  }

  equalsDate(other) {
    return this.dateTime &&
      other.dateTime &&
      this.dateTime.day === other.dateTime.day &&
      this.dateTime.month === other.dateTime.month &&
      this.dateTime.year === other.dateTime.year
  }

  static getCurrentDatetimeAsString() {
    return DateTime.now().toString()
  }
}
