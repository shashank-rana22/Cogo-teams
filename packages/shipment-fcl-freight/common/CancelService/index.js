import { Button, Modal } from '@cogoport/components';
import { ChipsController, InputController, RadioGroupController } from '@cogoport/forms';

import useGetServiceCancelControls from './hooks/useGetServiceCancelControls';
import styles from './styles.module.css';

const controlTypeMapping = {
	radio : RadioGroupController,
	text  : InputController,
	chips : ChipsController,
};

function FormElement({ name, label, errors, type, ...rest }) {
	const Element = controlTypeMapping[type];

	return Element ? (
		<div className={styles.form_element}>
			<div className={styles.label}>{label}</div>
			<Element name={name} {...rest} />
			{errors[name] ? <div className={styles.error_msg}>{errors[name].message}</div> : null}
		</div>
	) : null;
}

export default function CancelService({ setShow, service_type, trade_type }) {
	const closeModal = () => setShow(false);

	const {
		controls, control, errors, handleSubmit, onSubmit, loading,
	} = useGetServiceCancelControls({ service_type, trade_type, closeModal });

	return (
		<Modal
			show
			onClose={closeModal}
			closeOnOuterClick={false}
			showCloseIcon={!loading}
			className={styles.my_modal}
			size="lg"
		>
			<Modal.Header title="Cancel Service" />

			<Modal.Body>
				{controls.map((item) => <FormElement control={control} errors={errors} {...item} />)}
			</Modal.Body>

			<Modal.Footer>
				<Button onClick={closeModal} themeType="secondary">Cancel</Button>
				<Button onClick={handleSubmit(onSubmit)}>Confirm</Button>
			</Modal.Footer>
		</Modal>
	);
}
