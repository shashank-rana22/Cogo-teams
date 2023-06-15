import { Button, Modal, Table } from "@cogoport/components";
import styles from "./styles.module.css";
import { getColumns } from "../helpers/column";

const ViewScheduleModal = ({ show, setShow, columnsForPattern }) => {
    const modelTitle = (
        <div className={styles.heading}>
            Ocean Port Pair Schedule
            <div className={styles.button}>
                <Button type="update" size="md" themeType="accent">
                    Update
                </Button>
                <Button
                    type="bulkUpload"
                    size="md"
                    themeType="accent"
                    style={{ marginLeft: "4px" }}
                >
                    Bulk Upload
                </Button>
            </div>
        </div>
    );

    return (
        <Modal
            size="md"
            show={show}
            onClose={() => setShow(null)}
            placement="center"
        >
            <Modal.Header title={modelTitle} />
            <Modal.Body>
                {columnsForPattern && show && (
                    <Table columns={columnsForPattern} data={show?.patterns} />
                )}
            </Modal.Body>
        </Modal>
    );
};
export default ViewScheduleModal;
