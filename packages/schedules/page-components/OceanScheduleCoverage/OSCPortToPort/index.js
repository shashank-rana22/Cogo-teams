import { Button, Table } from "@cogoport/components";
import { IcMArrowBack } from "@cogoport/icons-react";
import useGetSailingSchedulePortPairCoverage from "../hooks/useGetSailingSchedulePortPairCoverage";
import styles from "../styles.module.css";
import ViewScheduleModal from "../ViewScheduleModal";
import LoadingState from "../LoadingState";

function OSCPortToPort({
    originPort,
    destinationPort,
    setIsPortToPort,
    columnsForPattern,
    columnsForPortToPort,
    show,
    setShow,
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
            <Button
                themeType="secondary"
                onClick={() => setIsPortToPort(false)}
            >
                <IcMArrowBack />
            </Button>
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
