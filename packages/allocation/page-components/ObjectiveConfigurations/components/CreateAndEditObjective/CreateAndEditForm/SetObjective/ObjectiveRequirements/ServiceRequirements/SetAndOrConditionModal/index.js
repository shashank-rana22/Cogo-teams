import { Button, Modal, RadioGroup } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import getSelectOperatorOptions from '../../../../../../../configurations/select-operator-options';

import styles from './styles.module.css';

function SetAndOrConditionModal(props) {
	const { t } = useTranslation(['allocation']);

	const { showAddAnotherConditionModal, setShowAnotherConditionModal, setFormValues, append } = props;

	const [selectedOperator, setSelectedOperator] = useState('');

	const selectOperatorOptions = getSelectOperatorOptions({ t });

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
					<h4>{t('allocation:add_another_service_heading')}</h4>
					<p>{t('allocation:add_another_service_phrase')}</p>
				</div>
			)}
			/>

			<Modal.Body>
				<RadioGroup
					className={styles.radio_group}
					value={selectedOperator}
					onChange={setSelectedOperator}
					options={selectOperatorOptions}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button
					type="button"
					themeType="tertiary"
					onClick={() => setShowAnotherConditionModal(false)}
					style={{ marginRight: '8px' }}
				>
					{t('allocation:cancel_button')}
				</Button>

				<Button
					type="button"
					themeType="accent"
					disabled={!selectedOperator}
					onClick={onConfirm}
				>
					{t('allocation:confirm_button')}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default SetAndOrConditionModal;
