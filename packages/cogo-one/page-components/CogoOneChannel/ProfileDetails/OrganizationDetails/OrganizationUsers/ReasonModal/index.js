import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import controls from '../../../../../../configurations/reason-for-number-view-controls';
import useCreateUserContactRequest from '../../../../../../hooks/useCreateUserContactRequest';

import Form from './Form';
import styles from './styles.module.css';

function ReasonModal({ setReasonModal = () => {}, reasonModal = false, user = {} }) {
	const {
		control,
		handleSubmit,
		watch,
	} = useForm();

	const { loading = false, createUserContactRequest = () => {} } = useCreateUserContactRequest();

	const selectedReasonType = watch('reason');

	const onSubmit = (values) => {
		createUserContactRequest({ values, user });
	};

	const showElements = {
		custome_reason: selectedReasonType === 'other',
	};

	return (
		<Modal
			size="sm"
			show={reasonModal}
			onClose={() => setReasonModal(false)}
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
