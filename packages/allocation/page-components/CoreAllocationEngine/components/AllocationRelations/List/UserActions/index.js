import { Button, Modal } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import useRelationActions from '../../../../hooks/useRelationActions';

import styles from './styles.module.css';

function UserActions({
	confirmModalState,
	setConfirmModalState = () => {},
	checkedRowsId,
	onClearSelection = () => {},
}) {
	const { t } = useTranslation(['allocation']);

	const requestType = confirmModalState.type;

	const DISPLAY_TEXT_MAPPING = {
		approve: {
			title     : `${startCase(requestType)} ${t('allocation:allocation_request')}`,
			body_text : `${startCase(requestType)} ${t('allocation:this_request_text')}`,
		},
		reject: {
			title     : `${startCase(requestType)} ${t('allocation:allocation_request')}`,
			body_text : `${startCase(requestType)} ${t('allocation:this_request_text')}`,
		},
		delete: {
			title     : `${startCase(requestType)} ${t('allocation:allocation_relation')}`,
			body_text : `${startCase(requestType)} ${t('allocation:this_allocation_relation')}`,
		},
		approve_all: {
			title     : t('allocation:bulk_approve_requests'),
			body_text : `${t('allocation:approved_label')} 
			${(checkedRowsId || []).length} ${t('allocation:request_validate')}`,
		},
	};

	const {
		handleUpdateRelation = () => {},
		loadingUpdateRelations = false,
	} = useRelationActions({
		confirmModalState,
		setConfirmModalState,
		checkedRowsId,
		onClearSelection,
		t,
	});

	return (
		<>
			<Modal.Header title={`${DISPLAY_TEXT_MAPPING[requestType].title}`} />

			<Modal.Body>
				{t('allocation:are_you_sure_you_want_to')}
				{' '}
				{DISPLAY_TEXT_MAPPING[requestType].body_text}
				?
			</Modal.Body>

			<Modal.Footer>
				<div className={styles.button_container}>
					<Button
						type="submit"
						size="md"
						themeType="primary"
						disabled={loadingUpdateRelations}
						onClick={handleUpdateRelation}
					>
						{t('allocation:yes_label')}
					</Button>
				</div>
			</Modal.Footer>
		</>

	);
}

export default UserActions;
