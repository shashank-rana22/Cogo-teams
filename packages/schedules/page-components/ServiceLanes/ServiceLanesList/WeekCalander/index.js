import styles from "./styles.module.css";

function WeekCalendar({ dayOfWeek, starting_day }) {
    const week = ["M", "T", "W", "T", "F", "S", "S"];

    return (
        <div>
            {"("}
            {week?.map((days) => {
                return <div>{days}</div>;
            })}
            {")"}
        </div>
    );
}

export default WeekCalendar;
