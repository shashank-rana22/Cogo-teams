import { Layout } from '@cogoport/air-modules';
import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import controls from './controls';
import styles from './styles.module.css';

function UpdateStatusModal({
	updateStatus = false,
	setUpdateStatus = () => {},
}) {
	const { control, formState:{ errors = {} }, handleSubmit } = useForm();
	return (
		<Modal
			show={updateStatus}
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
					onClick={() => setUpdateStatus(false)}
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

export default UpdateStatusModal;
