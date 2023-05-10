import { Button, Modal } from '@cogoport/components';
import { AsyncSelectController, InputController, UploadController, useForm } from '@cogoport/forms';

import STEP1CONTROLS from '../../config/uploadBookingNoteStep1Controls.json';

import styles from './styles.module.css';

const controlTypeMapping = {
	async_select : AsyncSelectController,
	text         : InputController,
	number       : InputController,
	file         : UploadController,
};

function FormElement({ name, label, errors, type, ...rest }) {
	const Element = controlTypeMapping[type];

	return Element ? (
		<div className={styles.form_element}>
			<div className={styles.label}>{label}</div>
			<Element name={name} type={type} {...rest} />
			{errors[name] ? <div className={styles.error_msg}>{errors[name].message}</div> : null}
		</div>
	) : null;
}

export default function UploadBN({ setShow }) {
	const { control, formState: { errors } } = useForm();

	const closeModal = () => setShow(false);

	return (
		<Modal
			onClose={closeModal}
			show
		>
			<Modal.Header title="Upload Booking Note" />
			<Modal.Body>
				{STEP1CONTROLS.map((item) => (
					<FormElement
						key={item.name}
						control={control}
						errors={errors}
						{...item}
					/>
				))}
			</Modal.Body>
			<Modal.Footer>
				<Button>Next</Button>
			</Modal.Footer>
		</Modal>
	);
}
