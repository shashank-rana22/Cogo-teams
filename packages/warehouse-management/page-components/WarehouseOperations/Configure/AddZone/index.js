import { Layout } from '@cogoport/air-modules';
import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import controls from './controls';
import styles from './styles.module.css';

function AddNewZoneModal({
	addNewZone = false,
	setAddNewZone = () => {},
}) {
	const { control, formState:{ errors = {} }, handleSubmit } = useForm();
	return (
		<Modal
			show={addNewZone}
			className={styles.modal_styled}
			placement="center"
			onClose={() => setAddNewZone(false)}
			closeOnOuterClick
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
					onClick={() => setAddNewZone(false)}
					themeType="secondary"
				>
					Cancel
				</Button>
				<Button
					// disabled={loading}
					onClick={handleSubmit}
				>
					Apply
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AddNewZoneModal;
