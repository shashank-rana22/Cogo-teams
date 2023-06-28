import { Button } from "@cogoport/components";
import styles from "./styles.module.css";
import RoutePort from "./RoutePort";
import { differenceInDays } from "@cogoport/utils";
import { IcMEdit } from "@cogoport/icons-react";
import WeekCalendar from "../../ServiceLanesList/WeekCalendar";
import WeekFrequency from "../../ServiceLanesList/WeekFrequency";

function RouteDetails({ route, dayOfWeek }) {
    const totalTransit =
        route?.[route?.length - 1]?.eta_day_count - route?.[0]?.etd_day_count;

    return (
        <div className={styles.box}>
            <div className={styles.header}>
                <div>
                    <div className={styles.total_transit}>
                        Total Transit &emsp;:
                        <div className={styles.total_transit_data}>
                            &emsp; {totalTransit} Days
                        </div>
                    </div>
                    <div className={styles.frequency}>
                        Frequency &emsp;&emsp;:
                        <div className={styles.frequency_data}>
                            <WeekFrequency
                                dayOfWeek={dayOfWeek || 10}
                                startingDay={route?.[0]?.eta_day - 1}
                            />
                            <WeekCalendar
                                dayOfWeek={dayOfWeek || 10}
                                startingDay={route?.[0]?.eta_day - 1}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.button}>
                    <Button
                        type="button"
                        themeType="primary"
                        size="md"
                        style={{ fontSize: "16px" }}
                    >
                        <IcMEdit /> &ensp;Edit
                    </Button>
                </div>
            </div>

            <div className={styles.route_points}>
                {route?.map((port, index) => {
                    if (index === route.length - 1)
                        return <RoutePort isLast={true} port={port} />;
                    return (
                        <>
                            <RoutePort
                                isFirst={index === 0}
                                port={port}
                                diffInDays={
                                    route?.[index + 1]?.eta_day_count -
                                    route?.[index]?.etd_day_count
                                }
                            />
                        </>
                    );
                })}
            </div>
        </div>
    );
}
export default RouteDetails;
