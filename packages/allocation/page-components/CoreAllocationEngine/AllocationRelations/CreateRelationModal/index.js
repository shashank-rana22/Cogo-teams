import { Button, Modal } from '@cogoport/components';

import Form from '../../../../common/Form';

import useCreateRelations from './useCreateRelations';

function CreateRelationModal({ showCreateRelationModal = false, setShowCreateRelationModal = () => {}, fetchList }) {
	const { controls, formProps, onCreate, handleSubmit, loading } = useCreateRelations({
		fetchList,
		setShowCreateRelationModal,
	});

	return (
		<Modal
			size="lg"
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
					type="submit"
					size="md"
					themeType="primary"
					disabled={loading}
					onClick={handleSubmit(onCreate)}
				>
					CREATE RELATION

				</Button>
			</Modal.Footer>
		</Modal>

	);
}

export default CreateRelationModal;
