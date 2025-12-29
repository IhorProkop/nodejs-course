import employeesData from "../data.json" with {type: "json"};

export function getUrl(url) {
    return url.split("/")[1];
}

export function getPositionName(position) {
    if (!position) return "No position specified";

    const key = position.toLowerCase();
    return employeesData[key] ?? "Position not found";
}