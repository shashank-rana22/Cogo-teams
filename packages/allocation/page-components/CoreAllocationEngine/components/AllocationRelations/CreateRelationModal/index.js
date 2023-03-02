import { Button, Modal } from '@cogoport/components';

import Form from '../../../../../common/Form';
import useCreateRelations from '../../../hooks/useCreateRelations';

function CreateRelationModal({ showCreateRelationModal = false, setShowCreateRelationModal = () => {}, fetchList }) {
	const { controls, formProps, onCreate, handleSubmit, loading } = useCreateRelations({
		fetchList,
		setShowCreateRelationModal,
	});

	return (
		<Modal
			size="md"
			show={showCreateRelationModal}
			onClose={() => setShowCreateRelationModal(false)}
			closeOnOuterClick={false}
			placement="center"
		>
			<Modal.Header title="Create Allocation Relation" />

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
					Cancel
				</Button>
				<Button
					type="submit"
					size="md"
					themeType="primary"
					disabled={loading}
					onClick={handleSubmit(onCreate)}
				>
					Save
				</Button>
			</Modal.Footer>
		</Modal>

	);
}

export default CreateRelationModal;
