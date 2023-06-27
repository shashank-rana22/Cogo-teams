import styles from "./styles.module.css";

function WeekFrequency({ dayOfWeek, starting_day }) {
    const weekMessage = [
        "Once a week",
        "Twice a week",
        "Thrice a week",
        "Four times a week",
        "Five times a week",
        "Six times a week",
        "Daily",
    ];
    const monthMessage = [
        "Once a month",
        "Twice a month",
        "Thrice a month",
        "Four times a month",
        "Five times a month",
    ];
    const yearMessage = [
        "Once a year",
        "Twice a year",
        "Quarterly a Year",
        "Four times a year",
        "Five times a year",
        "Half yearly",
        "Seven times a year",
        "Eight times a year",
        "Nine times a year",
        "Ten times a year",
        "Eleven times a year",
        "Yearly",
    ];

    const message = () => {
        if (dayOfWeek < 7) {
            return weekMessage[dayOfWeek - 1];
        } else if (dayOfWeek < 31) {
            return monthMessage[Math.floor(dayOfWeek / 7) - 1];
        } else {
            return yearMessage[Math.floor(dayOfWeek / 30) - 1];
        }
    };

    const printMessage = message();

    return <div>{printMessage}</div>;
}

export default WeekFrequency;
