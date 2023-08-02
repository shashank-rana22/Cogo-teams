import { Layout } from '@cogoport/air-modules';
import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import controls from './controls';
import styles from './styles.module.css';

function EditZoneModal({
	item = {},
	editZone = false,
	setEditZone = () => {},
}) {
	const { control, formState:{ errors = {} }, handleSubmit } = useForm();
	const editControls = controls(item);
	return (
		<Modal
			show={editZone}
			className={styles.modal_styled}
			placement="center"
			onClose={() => setEditZone(false)}
			closeOnOuterClick
		>
			<Modal.Header title="Edit new Zone" />
			<Modal.Body>
				<Layout
					fields={editControls}
					control={control}
					errors={errors}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className={styles.cancel_button}
					onClick={() => setEditZone(false)}
					themeType="secondary"
				>
					Cancel
				</Button>
				<Button
					onClick={handleSubmit}
				>
					Apply
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditZoneModal;
