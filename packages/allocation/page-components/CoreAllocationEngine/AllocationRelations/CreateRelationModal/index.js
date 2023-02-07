import { Button, Modal } from '@cogoport/components';

import Form from '../../../../common/Form';

import useCreateRelations from './useCreateRelations';

function CreateRelationModal({ showCreateRelationModal = false, setShowCreateRelationModal = () => {} }) {
	const { controls, formProps, onCreate } = useCreateRelations();

	// const { handleSubmit } = formProps;

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

				<Button type="submit" size="md" themeType="primary"> CREATE RELATION</Button>
			</Modal.Footer>
		</Modal>

	);
}

export default CreateRelationModal;
