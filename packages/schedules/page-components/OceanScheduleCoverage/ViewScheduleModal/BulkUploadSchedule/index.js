import { useForm } from "react";
import { Modal } from "@cogoport/components";
function BulkUploadSchedule({ setBulkUpload, bulkUpload }) {
    const radialButton = <></>;

    return (
        <>
            <Modal
                size="lg"
                show={bulkUpload}
                onClose={() => setBulkUpload(null)}
                placement="center"
            >
                <Modal.Header title="Bulk Upload" />
                <Modal.Body></Modal.Body>
            </Modal>
        </>
    );
}

export default BulkUploadSchedule;
