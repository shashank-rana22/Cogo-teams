import { Button, Modal, RadioGroup } from '@cogoport/components';
import { useState } from 'react';

import SELECT_OPERATOR_OPTIONS from '../../../../../../../configurations/select-operator-options';

import styles from './styles.module.css';

function SetAndOrConditionModal(props) {
	const { showAddAnotherConditionModal, setShowAnotherConditionModal, setFormValues, append } = props;

	const [selectedOperator, setSelectedOperator] = useState('');

	const onConfirm = () => {
		setFormValues((previousValues) => ({
			...previousValues,
			objectiveRequirements: {
				...(previousValues.objectiveRequirements || {}),
				service_requirement_operator: selectedOperator,
			},
		}));

		setShowAnotherConditionModal(false);

		append({});
	};

	return (
		<Modal
			size="md"
			show={showAddAnotherConditionModal}
			onClose={() => setShowAnotherConditionModal(false)}
		>
			<Modal.Header title={(
				<div>
					<h4>Add Another: And/Or Selection</h4>
					<p>You are adding another Service Requirement</p>
				</div>
			)}
			/>

			<Modal.Body>
				<RadioGroup
					className={styles.radio_group}
					value={selectedOperator}
					onChange={setSelectedOperator}
					options={SELECT_OPERATOR_OPTIONS}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button
					type="button"
					themeType="tertiary"
					onClick={() => setShowAnotherConditionModal(false)}
					style={{ marginRight: '8px' }}
				>
					Cancel
				</Button>

				<Button
					type="button"
					themeType="accent"
					disabled={!selectedOperator}
					onClick={onConfirm}
				>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default SetAndOrConditionModal;
