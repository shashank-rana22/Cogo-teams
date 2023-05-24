import { Button, Modal } from '@cogoport/components';
import { TradeDocTemplate } from '@cogoport/ocean-modules';
import { forwardRef } from 'react';

import useUploadCargoArrivalForm from '../../../../../../hooks/useUploadCargoArrivalForm';

import styles from './styles.module.css';

function UploadCargoArrivalForm({
	summary,
	show,
	setShow,
	savedData,
	setSavedData,
	pendingTask,
	refetch,
	clearTask,
}) {
	const {
		handleSubmitDocument,
		handleSave,
		ref,
		templateInitialValues,
		loading,
	} = useUploadCargoArrivalForm({
		summary,
		show,
		setShow,
		savedData,
		setSavedData,
		pendingTask,
		refetch,
		clearTask,
	});

	const header = (
		<div className={styles.head_content}>
			<div className={styles.heading}>Create Cargo Arrival Notice</div>

			<div className={styles.btn_wrapper}>
				<Button onClick={() => setShow(false)}>
					Cancel
				</Button>

				<Button
					style={{ marginLeft: 8 }}
					onClick={handleSave}
				>
					Save
				</Button>
			</div>
		</div>
	);

	return (
		<>
			{!savedData ? (
				<div>
					<Button
						onClick={() => { setShow(true); }}
						ghost="true"
					>
						Create Cargo Arrival Notice Document
					</Button>
				</div>
			) : (
				<Button
					onClick={() => { setShow(true); }}
					ghost="true"
				>
					View Draft
				</Button>
			)}

			{savedData ? (
				<div className={styles.submit_button}>
					<Button
						onClick={handleSubmitDocument}
						ghost="true"
						disabled={loading}
					>
						Submit
					</Button>
				</div>
			) : null}

			<div>
				<Modal
					show={show}
					size="fullscreen"
					placement="fullscreen"
					className={styles.custom_modal}
					onClose={() => setShow(false)}
					showCloseIcon={false}
				>
					<Modal.Header title={header} />

					<Modal.Body>
						<div className={styles.trade_document}>
							<TradeDocTemplate
								ref={(r) => { ref.current.submit = r; }}
								documentType="container_arrival_notice"
								initialValues={savedData || templateInitialValues}
								summary={summary}
							/>
						</div>
					</Modal.Body>
				</Modal>
			</div>
		</>
	);
}

export default forwardRef(UploadCargoArrivalForm);
