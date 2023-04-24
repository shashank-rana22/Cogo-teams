import { Button } from '@cogoport/components';
import { forwardRef } from 'react';

import useUploadCargoArrivalForm from '../../../../../../hooks/useUploadCargoArrivalForm';

// import styles from './styles.module.css';

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
		// handleSave,
		// ref,
		// templateInitialValues,
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

	return (
		<>
			{!savedData ? (
				<div>
					<Button
						onClick={() => {
							setShow(true);
						}}
						ghost="true"
					>
						Create Cargo Arrival Notice Document
					</Button>
				</div>
			) : (
				<Button
					onClick={() => {
						setShow(true);
					}}
					ghost="true"
				>
					View Draft
				</Button>
			)}

			{savedData ? (
				<div
					style={{
						display        : 'flex',
						marginTop      : '10px',
						justifyContent : 'flex-end',
					}}
				>
					<Button
						onClick={() => {
							handleSubmitDocument();
						}}
						ghost="true"
						disabled={loading}
					>
						Submit
					</Button>
				</div>
			) : null}

			<div>
				{/* <FullscreenModal
					heading="Create Cargo Arrival Notice"
					headerActions={(
						<Button
							style={{ marginLeft: 8 }}
							onClick={handleSave}
							size="sm"
							id="cargo_arrival_notice_btn"
						>
							Save
						</Button>
					)}
					show={show}
					setShow={setShow}
				>
					<div className={styles.trade_document}>
						<TradeDocTemplate
							ref={(r) => {
								ref.current.submit = r;
							}}
							mode="write"
							documentType="container_arrival_notice"
							initialValues={savedData || templateInitialValues}
							summary={summary}
						/>
					</div>
				</FullscreenModal> */}
			</div>
		</>
	);
}

export default forwardRef(UploadCargoArrivalForm);
