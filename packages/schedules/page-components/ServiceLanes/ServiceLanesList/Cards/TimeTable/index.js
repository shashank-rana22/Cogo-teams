import styles from "./styles.module.css";
import WeekFrequency from "../../WeekFrequency";
import WeekCalendar from "../../WeekCalendar";

function TimeTable({ item }) {
    console.log("item: ", item?.service_lane_links?.[0]?.eta_day - 1, item);

    const totalTransit =
        item?.service_lane_links?.[item?.service_lane_links?.length - 1]
            ?.eta_day_count - item?.service_lane_links?.[0]?.etd_day_count;
    return (
        <div className={styles.container}>
            <div className={styles.frequency}>
                Frequency :
                <div className={styles.data}>
                    <WeekFrequency
                        dayOfWeek={item?.day_of_week || 12}
                        startingDay={
                            item?.service_lane_links?.[0]?.eta_day - 1 || 20
                        }
                    />
                    <WeekCalendar
                        dayOfWeek={item?.day_of_week || 12}
                        startingDay={
                            item?.service_lane_links?.[0]?.eta_day - 1 || 4
                        }
                    />
                </div>
            </div>

            <div className={styles.transit}>
                Total Transit :
                <div className={styles.data}>
                    <div className={styles.days}>{totalTransit} Days</div>
                    <div className={styles.trip}>
                        {item?.trip_type || "Round Trip"}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TimeTable;
