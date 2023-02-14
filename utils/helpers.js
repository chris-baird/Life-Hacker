const dayjs = require("dayjs")
module.exports = {
  format_date: (date) => {
    return dayjs(date).format("dddd, MMMM D YYYY")
    // return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  },
}
