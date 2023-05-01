import { Button, Modal } from '@cogoport/components';
import { TextAreaController, useForm } from '@cogoport/forms';
import React from 'react';

import useUpdateShipmentPendingTask from '../../../../../hooks/useUpdateShipmentPendingTask';

function UnableToDoTask({
	setShowUnableTo = () => {},
	showUnableTo = false,
	task = {},
}) {
	const { control, handleSubmit, reset } = useForm();

	const { apiTrigger, loading } = useUpdateShipmentPendingTask({
		refetch: () => {
			setShowUnableTo(false);
			reset();
		},
		successMessage: 'Request Submitted Successfully',
	});

	const onCreate = ({ remark }) => {
		const payload = {
			id      : task?.id,
			remarks : [remark],
			status  : 'pending',
		};

		apiTrigger(payload);
	};

	return (
		<Modal
			show={showUnableTo}
			onClose={() => setShowUnableTo(false)}
		>
			<Modal.Header title="Unable to do Task" />

			<Modal.Body>
				<h4>Enter Reason</h4>
				<TextAreaController
					name="remark"
					placeholder="Type here..."
					control={control}
					style={{ height: '100px' }}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button
					className="secondary md"
					style={{ marginRight: '12px' }}
					onClick={() => {
						setShowUnableTo(false);
						reset();
					}}
					disabled={loading}
				>
					Cancel
				</Button>

				<Button disabled={loading} onClick={handleSubmit(onCreate)}>
					{loading ? 'Submiting...' : 'Submit'}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default UnableToDoTask;
