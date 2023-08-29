import { Button, Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import Form from '../../../../../common/Form';
import useCreateRelations from '../../../hooks/useCreateRelations';

function CreateRelationModal({
	showCreateRelationModal = false,
	setShowCreateRelationModal = () => {},
	fetchList,
}) {
	const { t } = useTranslation(['allocation']);

	const { controls, formProps, onCreate, handleSubmit, loading } = useCreateRelations({
		fetchList,
		setShowCreateRelationModal,
		t,
	});

	return (
		<Modal
			size="md"
			show={showCreateRelationModal}
			onClose={() => setShowCreateRelationModal(false)}
			closeOnOuterClick={false}
			placement="center"
		>
			<Modal.Header title={t('allocation:create_allocation_relation')} />

			<Modal.Body>
				<Form controls={controls} formProps={formProps} />
			</Modal.Body>

			<Modal.Footer>
				<Button
					type="button"
					size="md"
					themeType="tertiary"
					disabled={loading}
					onClick={() => setShowCreateRelationModal(false)}
					style={{ marginRight: '10px' }}
				>
					{t('allocation:cancel_button')}
				</Button>
				<Button
					type="submit"
					size="md"
					themeType="primary"
					disabled={loading}
					onClick={handleSubmit(onCreate)}
				>
					{t('allocation:save_button')}
				</Button>
			</Modal.Footer>
		</Modal>

	);
}

export default CreateRelationModal;
