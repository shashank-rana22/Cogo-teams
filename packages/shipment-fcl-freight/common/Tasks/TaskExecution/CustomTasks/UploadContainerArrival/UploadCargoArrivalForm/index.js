import { Button } from '@cogoport/components';
import { forwardRef } from 'react';

import useUploadCargoArrivalForm from '../../../../../../hooks/useUploadCargoArrivalForm';

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
		</>
	);
}

export default forwardRef(UploadCargoArrivalForm);
