import Layout from '@cogoport/air-modules/components/Layout';
import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import controls from '../../../configs/cancelled-booking-controls';

import styles from './styles.module.css';

function CancelledBookingModal({
	updateConfirmation = () => {},
	item = {},
	serviceProvidersData,
	refetchList = () => {},
	shipment_id = '',
	setStep = () => {},
}) {
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm({ controls });

	const handleOnClick = async (values) => {
		(serviceProvidersData || []).forEach((itm) => {
			const value = itm;
			if (item?.priority === value?.priority) {
				value.booking_confirmation_status = 'not_booked';
				value.booking_not_placed_reason = values.cancellation_reason;
				value.booking_not_placed_proof = values.upload_proof.url;
			}
		});
		const payload = {
			id                : item?.preference_id,
			service_providers : serviceProvidersData,
		};
		await updateConfirmation({
			payload,
			refetchList,
			shipment_id,
			setStep,
		});
	};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>BOOKING NOT PLACED</div>
			<Layout
				fields={controls}
				errors={errors}
				control={control}
				// showElements={showElements}
			/>
			<div className={styles.button_container}>
				<Button className="primary md" onClick={handleSubmit(handleOnClick)}>
					Confirm
				</Button>
			</div>
		</div>
	);
}

export default CancelledBookingModal;
