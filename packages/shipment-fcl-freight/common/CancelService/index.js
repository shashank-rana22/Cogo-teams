import { Button, Modal } from '@cogoport/components';
import { InputController, RadioGroupController } from '@cogoport/forms';

import useGetServiceCancelControls from './hooks/useGetServiceCancelControls';
import styles from './styles.module.css';

const controlTypeMapping = {
	radio : RadioGroupController,
	text  : InputController,
};

function FormElement({ name, label, errors, type, ...rest }) {
	const Element = controlTypeMapping[type];

	return Element ? (
		<div className={styles.form_element}>
			<div className={styles.label}>{label}</div>
			{errors[name] ? <div className={styles.error_msg}>{errors[name].message}</div> : null}
			<Element name={name} {...rest} />
		</div>
	) : null;
}

export default function CancelService({ setShow }) {
	const closeModal = () => setShow(false);

	const { controls, control, errors, handleSubmit } = useGetServiceCancelControls();

	const onSubmit = (data) => console.log(data);

	return (
		<Modal
			show
			onClose={closeModal}
			closeOnOuterClick={false}
			size="lg"
		>
			<Modal.Header title="Cancel Service" />
			<Modal.Body>
				{controls.map((item) => <FormElement control={control} errors={errors} {...item} />)}
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleSubmit(onSubmit)}>Confirm</Button>
			</Modal.Footer>
		</Modal>
	);
}
