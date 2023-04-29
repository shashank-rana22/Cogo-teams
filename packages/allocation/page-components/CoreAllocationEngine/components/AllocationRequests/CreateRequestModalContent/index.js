import { Button, Modal } from '@cogoport/components';

import Form from '../../../../../common/Form';
import useCreateAllocationRequest from '../../../hooks/useCreateAllocationRequest';

function CreateUpdateModal(props) {
	const { refetch, onCloseModal, params } = props;

	const {
		onSave,
		loading: loadingOnSave,
		formProps,
		controls,
	} = useCreateAllocationRequest({ onCloseModal, refetch, params });

	const { handleSubmit } = formProps;

	return (
		<>
			<Modal.Header title="Create Request" />

			<form onSubmit={handleSubmit(onSave)}>
				<Modal.Body>
					<Form
						formProps={formProps}
						controls={controls}
					/>
				</Modal.Body>

				<Modal.Footer>
					<Button
						size="md"
						type="button"
						themeType="tertiary"
						disabled={loadingOnSave}
						id="cancel_request_btn"
						onClick={onCloseModal}
						style={{ marginRight: '10px' }}
					>
						Cancel
					</Button>

					<Button
						size="md"
						type="submit"
						themeType="primary"
						loading={loadingOnSave}
						id="save_request_btn"
					>
						Save
					</Button>
				</Modal.Footer>
			</form>
		</>
	);
}

export default CreateUpdateModal;
