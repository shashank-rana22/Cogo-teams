import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import getRevertFormControls from '../../../../../configurations/revert-form-controls';
import { MAX_WEIGHT_SLAB } from '../../../../../constants';
import { getDefaultValues } from '../../../../../helpers/getDefaultValues';
import useRevertPrice from '../../../../../hooks/useRevertPrice';

import Form from './Form';
import styles from './styles.module.css';

const MIN_CHARGEABLE_WEIGHT = 45;

function RevertModal({ modalState, setModalState, userId, shipmentFlashBookingRates }) {
	const { data } = modalState || {};

	const {
		control,
		handleSubmit,
		formState: { errors = {} },
		watch,
	} = useForm({
		defaultValues: getDefaultValues({ data }),
	});

	const chargeableWeight = watch('chargeable_weight');

	const {
		loading,
		handleRevertPrice,
	} = useRevertPrice({ item: data, setModalState, shipmentFlashBookingRates, chargeableWeight, userId });

	const controls = getRevertFormControls({
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
