import { Button, Modal } from '@cogoport/components';
import { RadioGroupController, useForm } from '@cogoport/forms';

import useUpdateShipmentPendingTask from '../../../../../hooks/useUpdateShipmentPendingTask';

import styles from './styles.module.css';

function UpdateAssignedStakeholder({
	setShowAdmin = () => {},
	showAdmin = false,
	refetch = () => {},
	task = {},
}) {
	const { control, handleSubmit } = useForm();

	const { apiTrigger, loading } = useUpdateShipmentPendingTask({
		refetch: () => {
			refetch();
			setShowAdmin(false);
		},
	});

	const onCreate = ({ assigned_stakeholder }) => {
		const payload = {
			id     : task?.id,
			status : 'pending',
			assigned_stakeholder,
		};
		apiTrigger(payload);
	};

	return (
		<Modal
			show={showAdmin}
			onClose={() => setShowAdmin(false)}
		>
			<Modal.Header title="Update Assigned Stakeholder" />

			<Modal.Body>
				<div className={styles.container}>
					<RadioGroupController
						options={[
							{ label: 'OKAM', value: 'booking_agent' },
							{ label: 'Service Ops 1', value: 'service_ops1' },
							{ label: 'Service Ops 2', value: 'service_ops2' },
							{ label: 'Costbooking Ops', value: 'costbooking_ops' },
							{ label: 'Collection desk', value: 'collection_desk' },
							{ label: 'Release desk', value: 'release_desk' },
							{ label: 'Lastmile Ops', value: 'lastmile_ops' },
						]}
						control={control}
						name="assigned_stakeholder"
						rules={{ required: { value: true, message: 'This is required' } }}
					/>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					style={{ marginRight: '12px' }}
					onClick={() => setShowAdmin(false)}
					disabled={loading}
					themeType="secondary"
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
