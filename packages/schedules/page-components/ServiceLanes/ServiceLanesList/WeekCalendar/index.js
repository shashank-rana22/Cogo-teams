import styles from "./styles.module.css";

function WeekCalendar({ dayOfWeek, startingDay }) {
    const week = ["M", "T", "W", "T", "F", "S", "S"];

    return (
        <div className={styles.box}>
            {"( "}
            {week?.map((days, index) => {
                return (
                    <span
                        className={
                            index === startingDay ? styles.active_day : null
                        }
                    >
                        {days}{" "}
                    </span>
                );
            })}
            {")"}
        </div>
    );
}

export default WeekCalendar;
