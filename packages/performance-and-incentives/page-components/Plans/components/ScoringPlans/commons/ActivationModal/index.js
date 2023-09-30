import { Modal, Button, Datepicker, Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { format } from '@cogoport/utils';
import { useState } from 'react';

import usePostAgentScoringAttributes from '../../../../hooks/usePostAgentScoringConfigAttributes';

import styles from './styles.module.css';

function ActivationModal({
	source = '',
	refetch = () => {},
	activeActionId = '', setActiveActionId = () => {}, setShowActivationModal = () => {},
}) {
	const { push } = useRouter();

	const [activationDate, setActivationDate] = useState('');

	const { updateScoringAttributes } = usePostAgentScoringAttributes();

	const handleClose = () => {
		setActiveActionId(null);
		setShowActivationModal(false);
	};

	const handleActivate = async () => {
		if (!activationDate) {
			Toast.error('Select date to activate config');
			return;
		}

		await updateScoringAttributes({ configId: activeActionId, status: 'active', activationDate });

		setShowActivationModal(false);
		Toast.success('Activated successfully!');

		if (source) {
			push('/performance-and-incentives/plans');
			return;
		}

		setActiveActionId(null);
		refetch();
	};

	return (
		<Modal
			size="md"
			show
			onClose={handleClose}
			placement="center"
			className={styles.container}
		>

			<Modal.Body>
				<div className={styles.body}>

					<h3>Select Activation Date for Config</h3>

					<div className={styles.date_picker}>
						<Datepicker
							placeholder="Select Date"
							showTimeSelect={false}
							dateFormat="MM/dd/yyyy HH:mm"
							name="date"
							onChange={(value) => setActivationDate(value)}
							value={activationDate ? new Date(format(activationDate)) : undefined}
							size="md"
							isPreviousDaysAllowed={false}
						/>
					</div>

				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button
					themeType="secondary"
					type="button"
					onClick={handleClose}
					style={{ marginRight: '6px' }}
				>
					Cancel

				</Button>
				<Button type="button" onClick={handleActivate}>Activate</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ActivationModal;
