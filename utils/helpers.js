// Function to format a date as "MM/DD/YYYY"
function formatDate(date) {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
        date
      ).getFullYear()}`;
}

// Export the formatDate function
module.exports = {
    formatDate
}
