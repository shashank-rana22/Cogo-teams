import { Layout } from '@cogoport/air-modules';
import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import useUpdateInventory from '../../../../hooks/useUpdateInventory';

import controls from './controls';
import styles from './styles.module.css';

function UpdateStatusModal({
	item = {},
	showUpdateStatusModal = '',
	setShowUpdateStatusModal = () => {},
	listAPI = () => {},
}) {
	const { control, formState:{ errors = {} }, watch } = useForm();
	const formValues = watch();
	const { handleUpdate } = useUpdateInventory({ item, formValues, setShowUpdateStatusModal, listAPI });
	return (
		<Modal
			show={showUpdateStatusModal}
		>
			<Modal.Header title="Add new Zone" />
			<Modal.Body>
				<Layout
					fields={controls}
					control={control}
					errors={errors}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className={styles.cancel_button}
					onClick={() => setShowUpdateStatusModal(false)}
					themeType="secondary"
				>
					Cancel
				</Button>
				<Button
					// disabled={loading}
					onClick={handleUpdate}
				>
					Apply
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default UpdateStatusModal;
