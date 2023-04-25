/**
 * Formats a date as "MM/DD/YYYY"
 * @param {Date} date - The date to format
 * @return {string} The formatted date string
 */
function formatDate(date) {
  return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
      date,
  ).getFullYear()}`;
}

// Export the formatDate function
module.exports = {
  formatDate,
};
