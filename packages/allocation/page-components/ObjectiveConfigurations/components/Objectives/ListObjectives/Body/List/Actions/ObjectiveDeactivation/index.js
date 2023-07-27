import { Modal, Button } from '@cogoport/components';

import useDeactivateObjective from './useDeativateObjective';

function ObjectiveDeactivation(props) {
	const { objectiveId, setShowActionModal } = props;

	const { loading, onDeactivation } = useDeactivateObjective({ objectiveId, setShowActionModal });

	return (
		<>
			<Modal.Header title="Set Objective Activation Date" />

			<Modal.Body>
				<p>
					Are you sure you want to deactivate this objective?
				</p>
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
					onClick={onDeactivation}
				>
					Yes, I do
				</Button>
			</Modal.Footer>
		</>
	);
}

export default ObjectiveDeactivation;
