import { Modal, Button, Datepicker } from '@cogoport/components';

import styles from './styles.module.css';
import useActivateObjective from './useActivateObjective';

function ObjectiveActivation(props) {
	const { objectiveId, setShowActionModal } = props;

	const {
		loading,
		onSetActivation,
		activationDate,
		setActivationDate,
	} = useActivateObjective({ objectiveId, setShowActionModal });

	return (
		<>
			<Modal.Header title="Set Objective Activation Date" />

			<Modal.Body>
				<p>
					Choose the date from which the Objective should be active and ready to be used.
				</p>

				<div className={styles.datepicker}>
					<Datepicker
						name="activation_date"
						value={activationDate}
						onChange={setActivationDate}
					/>
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button
					type="button"
					themeType="tertiary"
					style={{ marginRight: '12px' }}
					disabled={loading}
					onClick={() => setShowActionModal({})}
				>
					Cancel
				</Button>

				<Button
					type="button"
					themeType="accent"
					loading={loading}
					onClick={onSetActivation}
				>
					Set Activation
				</Button>
			</Modal.Footer>
		</>
	);
}

export default ObjectiveActivation;
