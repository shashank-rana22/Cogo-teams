import { Button, Modal, Table } from "@cogoport/components";
import styles from "./styles.module.css";
import { useState } from "react";
import UpdateScheduleModal from "./UpdateScheduleModal";
import BulkUploadSchedule from "./BulkUploadSchedule";

const ViewScheduleModal = ({ show, setShow, columnsForPattern }) => {
    const [update, setUpdate] = useState(false);
    const [bulkUpload, setBulkUpload] = useState(false);

    const modelTitle = (
        <div className={styles.heading}>
            Ocean Port Pair Schedule
            {/* <div className={styles.button}>
                <Button
                    type="update"
                    size="md"
                    themeType="accent"
                    onClick={() => setUpdate(true)}
                >
                    Update
                </Button>
                <Button
                    type="bulkUpload"
                    size="md"
                    themeType="accent"
                    style={{ marginLeft: "4px" }}
                    onClick={() => setBulkUpload(true)}
                >
                    Bulk Upload
                </Button>
            </div> */}
        </div>
    );

    return (
        <>
            {!update && !bulkUpload && (
                <Modal
                    size="md"
                    show={show}
                    onClose={() => setShow(null)}
                    placement="center"
                >
                    <Modal.Header title={modelTitle} />
                    <Modal.Body>
                        {columnsForPattern && show && (
                            <Table
                                columns={columnsForPattern}
                                data={show?.patterns}
                            />
                        )}
                    </Modal.Body>
                </Modal>
            )}
            {update && !bulkUpload && (
                <UpdateScheduleModal setUpdate={setUpdate} update={update} />
            )}
            {!update && bulkUpload && (
                <BulkUploadSchedule
                    setBulkUpload={setBulkUpload}
                    bulkUpload={bulkUpload}
                />
            )}
        </>
    );
};
export default ViewScheduleModal;
