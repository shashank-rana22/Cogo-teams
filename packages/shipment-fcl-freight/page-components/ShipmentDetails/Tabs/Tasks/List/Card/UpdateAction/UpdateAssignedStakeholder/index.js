import { Toast, Button, Modal } from '@cogoport/components';
import { RadioGroupController, useForm } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';
import React from 'react';

function UpdateAssignedStakeholder({
	setShowAdmin = () => {},
	showAdmin = false,
	refetch = () => {},
	task = {},
}) {
	const { control, handleSubmit } = useForm();

	const loading = false;

	const onCreate = ({ assigned_stakeholder }) => {
		Toast(startCase(assigned_stakeholder));
	};

	return (
		<Modal
			show={showAdmin}
			onClose={() => setShowAdmin(false)}
		>
			<Modal.Header title="Update Assigned Stakeholder" />

			<Modal.Body>
				<RadioGroupController
					options={[
						{ label: 'OKAM', value: 'booking_agent' },
						{ label: 'SO1', value: 'service_ops1' },
						{ label: 'SO2', value: 'service_ops2' },
					]}
					control={control}
					name="assigned_stakeholder"
					rules={{ required: { value: true, message: 'This is required' } }}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className="secondary md"
					style={{ marginRight: '12px' }}
					onClick={() => setShowAdmin(false)}
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

export default UpdateAssignedStakeholder;
