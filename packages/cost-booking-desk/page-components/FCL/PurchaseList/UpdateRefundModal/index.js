import { Modal, Button } from '@cogoport/components';
import {
	AsyncSelectController,
	InputController,
	SelectController,
	TextAreaController,
	UploadController,
	DatepickerController,
	useForm,
} from '@cogoport/forms';

import formControls from './formControls';
import styles from './styles.module.css';

const controlTypeMapping = {
	text        : InputController,
	select      : SelectController,
	textarea    : TextAreaController,
	number      : InputController,
	asyncSelect : AsyncSelectController,
	upload      : UploadController,
	datepicker  : DatepickerController,
};

function FormElement({ name, label, type, errors, showElements, ...rest }) {
	const Element = controlTypeMapping[type];

	return Element ? (
		<div>
			<div className={styles.label}>{label}</div>
			<Element name={name} type={type} {...rest} />
			{errors[name] ? <div className={styles.errors}>{errors[name].message}</div> : null}
		</div>
	) : null;
}

function UpdateRefundModal({
	updateRefundModal = false,
	setUpdateRefundModal = () => {},
}) {
	const controls = formControls();

	const {
		handleSubmit,
		control,
		formState: { errors },
		watch,
		// setValue,
	} = useForm();

	const onSubmit = () => {
		console.log('huihuihui');
	};

	const formValues = watch();
	console.log('formValues:', formValues);

	return (
		<Modal
			show={updateRefundModal}
			onClose={() => setUpdateRefundModal(false)}
		>
			<Modal.Header title="Update Refund Details" />
			<Modal.Body>
				{(controls || []).map((item) => (
					<FormElement
						key={item?.name}
						control={control}
						errors={errors}
						{...item}
					/>
				))}
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleSubmit(onSubmit)}>Submit</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default UpdateRefundModal;
