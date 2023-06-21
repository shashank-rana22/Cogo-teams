import { Button, Table } from "@cogoport/components";
import { IcMArrowBack, IcMArrowNext } from "@cogoport/icons-react";
import useGetSailingSchedulePortPairCoverage from "../hooks/useGetSailingSchedulePortPairCoverage";
import ViewScheduleModal from "../ViewScheduleModal";
import LoadingState from "../LoadingState";
import styles from "./styles.module.css";

function OSCPortToPort({
    originPort,
    destinationPort,
    setIsPortToPort,
    columnsForPattern,
    columnsForPortToPort,
    show,
    setShow,
    portPairData,
}) {
    const { data, loading, coverageTotalCount } =
        useGetSailingSchedulePortPairCoverage({
            originPort,
            destinationPort,
        });

    return (
        <>
            <ViewScheduleModal
                show={show}
                setShow={setShow}
                columnsForPattern={columnsForPattern}
            />
            <div className={styles.top_bar}>
                <Button
                    themeType="secondary"
                    onClick={() => setIsPortToPort(false)}
                >
                    <IcMArrowBack />
                </Button>
                <div className={styles.port_pair}>
                    {portPairData[0]?.origin_port?.name}
                    <div
                        style={{
                            display: "flex",
                            padding: "0 16px",
                            alignItem: "center",
                        }}
                    >
                        <IcMArrowNext />
                    </div>
                    {portPairData[0]?.destination_port?.name}
                </div>
            </div>

            <div style={{ padding: "8px" }} />

            {!loading ? (
                columnsForPortToPort &&
                data && (
                    <Table
                        columns={columnsForPortToPort}
                        data={data}
                        className={styles.table}
                    />
                )
            ) : (
                <LoadingState />
            )}
        </>
    );
}
export default OSCPortToPort;
