import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import controls from '../../../../../../configurations/reason-for-number-view-controls';

import Form from './Form';
import styles from './styles.module.css';

function ReasonModal({
	showReasonModal = false,
	user = {},
	onClose = () => {},
	loading = false,
	createUserContactRequest = () => {},
}) {
	const {
		control,
		handleSubmit,
		watch,
		reset,
	} = useForm();

	const selectedReasonType = watch('reason');

	const onSubmit = (values) => {
		createUserContactRequest({ values, user, reset });
	};

	const showElements = {
		custom_reason: selectedReasonType === 'other',
	};

	return (
		<Modal
			size="sm"
			show={showReasonModal}
			onClose={() => onClose({ reset })}
			onOuterClick={() => onClose({ reset })}
			placement="center"
		>
			<Modal.Header title="Enter reason to view number !" />

			<Modal.Body className={styles.container}>
				<Form control={control} controls={controls} showElements={showElements} />
			</Modal.Body>

			<Modal.Footer>
				<Button
					className={styles.button_spacing}
					loading={loading}
					onClick={handleSubmit(onSubmit)}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ReasonModal;
