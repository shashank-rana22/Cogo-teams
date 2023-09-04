import { Modal, Button } from '@cogoport/components';
import {
	InputController,
	SelectController,
	UploadController,
	DatepickerController,
	useForm,
} from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import formControls from './controls';
import styles from './styles.module.css';

const ONLINE_PAYMENT_MODES = ['NEFT', 'RTGS'];

const controlTypeMapping = {
	text       : InputController,
	select     : SelectController,
	number     : InputController,
	upload     : UploadController,
	datepicker : DatepickerController,
};

function FormElement({ name, label, type, errors, showElements, ...rest }) {
	const Element = controlTypeMapping[type];
	const show = !isEmpty(showElements[name]) ? showElements[name] : true;

	return (Element && show) ? (
		<div>
			<div className={styles.label}>{label}</div>
			<Element name={name} type={type} {...rest} />
			{errors[name] ? <div className={styles.errors}>{errors[name].message}</div> : null}
		</div>
	) : null;
}

function UpdateRefundModal({
	updateRefundModal = {},
	setUpdateRefundModal = () => {},
}) {
	const controls = formControls();

	const { payment_mode } = updateRefundModal || {};

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

	const showElements = {
		utr_number: ONLINE_PAYMENT_MODES.includes(payment_mode),
	};

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
						showElements={showElements}
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
