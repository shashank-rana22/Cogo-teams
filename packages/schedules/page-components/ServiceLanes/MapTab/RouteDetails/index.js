import { Button } from "@cogoport/components";
import styles from "./styles.module.css";
import RoutePort from "./RoutePort";
import { differenceInDays } from "@cogoport/utils";
import { IcMEdit } from "@cogoport/icons-react";

function RouteDetails({ route }) {
    console.log("route: ", route);
    return (
        <div className={styles.box}>
            <div className={styles.header}>
                <div>
                    <div className={styles.total_transit}>
                        Total Transit &emsp;:
                        <div className={styles.total_transit_data}>
                            &emsp; data
                        </div>
                    </div>
                    <div className={styles.frequency}>
                        Frequency &emsp;&emsp;:
                        <div className={styles.frequency_data}>&emsp;data</div>
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

            <div>routes</div>
            {/* <div className={styles.route_details}>
                <div className={styles.heading}>
                    <div>
                        Total Transit :{" "}
                        {route &&
                            differenceInDays(
                                Date.parse(
                                    route?.[route.length - 1]?.eta?.slice(0, 10)
                                ),
                                Date.parse(route?.[0]?.etd?.slice(0, 10))
                            )}{" "}
                        Days
                    </div>
                    <div>
                        <Button>Edit</Button>
                    </div>
                </div>
                <div className={styles.route_points}>
                    {route?.map((port, index) => {
                        if (index === route.length - 1)
                            return <RoutePort isLast={true} port={port} />;
                        return (
                            <RoutePort
                                isFirst={index === 0}
                                port={port}
                                diffInDays={differenceInDays(
                                    Date.parse(
                                        route?.[index + 1]?.etd?.slice(0, 10)
                                    ),
                                    Date.parse(
                                        route?.[index]?.etd?.slice(0, 10)
                                    )
                                )}
                            />
                        );
                    })}
                </div>
            </div> */}
        </div>
    );
}
export default RouteDetails;
