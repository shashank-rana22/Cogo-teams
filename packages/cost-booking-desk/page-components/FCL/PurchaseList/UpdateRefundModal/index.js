import { Modal, Button } from '@cogoport/components';
import {
	useForm,
} from '@cogoport/forms';

import formControls from './controls';
import FormElement from './FormElement';

const ONLINE_PAYMENT_MODES = ['NEFT', 'RTGS'];

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
