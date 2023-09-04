import { Modal, Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import useDeactivateObjective from './useDeativateObjective';

function ObjectiveDeactivation(props) {
	const { t } = useTranslation(['allocation']);
	const { objectiveId, setShowActionModal, refetch } = props;

	const { loading, onDeactivation } = useDeactivateObjective({ objectiveId, setShowActionModal, refetch });

	return (
		<>
			<Modal.Header title={t('allocation:set_objective_activation_date')} />

			<Modal.Body>
				<p>
					{t('allocation:are_you_sure_you_want_to_deactivate_this_objective')}
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
					{t('allocation:cancel_button')}
				</Button>

				<Button
					type="button"
					themeType="accent"
					loading={loading}
					onClick={onDeactivation}
				>
					{t('allocation:yes_i_do_button')}
				</Button>
			</Modal.Footer>
		</>
	);
}

export default ObjectiveDeactivation;
