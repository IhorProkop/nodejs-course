const employeesData = require("../data.json");

function getUrl(url) {
    return url.split('/')[1];
}

function getPositionName(position) {
    if (!position) return 'Unknown Position';
    const key = position.toLowerCase();
    return employeesData[key] ?? "There is no employee with such position";
}

module.exports = { getUrl, getPositionName };