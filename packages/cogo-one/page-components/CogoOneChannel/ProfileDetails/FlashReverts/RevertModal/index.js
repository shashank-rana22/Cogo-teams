import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import useGetRevertFormControls from '../../../../../configurations/revert-form-controls.';
import useRevertPrice from '../../../../../hooks/useRevertPrice';

import Form from './Form';
import styles from './styles.module.css';

const MAX_WEIGHT_SLAB = 500;
const MIN_CHARGEABLE_WEIGHT = 45;

function RevertModal({ modalState, setModalState, userId, shipmentFlashBookingRates }) {
	const { data } = modalState || {};

	const {
		control,
		handleSubmit,
		formState: { errors = {} },
		watch,
	} = useForm({
		defaultValues: {
			weight_slabs: [{
				lower_limit : '',
				upper_limit : '',
			}],
			chargeable_weight: data?.service?.chargeable_weight || '',
		},
	});

	const {
		loading,
		handleRevertPrice,
	} = useRevertPrice({ item: data, setModalState, shipmentFlashBookingRates });

	const chargeableWeight = watch('chargeable_weight');

	const controls = useGetRevertFormControls({
		data,
		userId,
		chargeableWeight,
	});

	const showElements = {
		min_price    : chargeableWeight < MIN_CHARGEABLE_WEIGHT,
		weight_slabs : chargeableWeight < MAX_WEIGHT_SLAB,
	};

	return (
		<Modal
			show
			size="lg"
			placement="center"
			onClose={() => setModalState({ isOpen: false, data: {} })}
		>
			<Modal.Header title="ADD PRICE" />
			<Modal.Body>
				<Form control={control} errors={errors} controls={controls} showElements={showElements} />
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.button_container}>
					<Button
						size="md"
						themeType="accent"
						onClick={() => setModalState({ isOpen: false, data: {} })}
					>
						Cancel

					</Button>
					<Button
						className={styles.button_spacing}
						loading={loading}
						onClick={handleSubmit(handleRevertPrice)}
					>
						Submit
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
export default RevertModal;
