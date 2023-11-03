import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import SpotBookingInstructions from '../../../../../common/SpotBookingInstructions';
import useListOperators from '../../../../../common/SpotBookingInstructions/hooks/useListOperators';

import FclCard from './FclCard';
import Footer from './Footer';
import styles from './styles.module.css';

const MAPPING = {
	fcl_freight: FclCard,
};

function SpotBooking({ detail = {} }) {
	const { service_type = '' } = detail;

	const [detentionValues, setDetentionValues] = useState({
		origin_detention      : 4,
		origin_demurrage      : 4,
		destination_detention : 4,
		destination_demurrage : 4,
	});

	const { shippingLines = [], loading } = useListOperators();

	const { handleSubmit = () => {}, watch = () => {}, ...formProps } = useForm();

	const ActiveComponent = MAPPING[service_type];

	if (!ActiveComponent) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Spotline Booking</div>
			<div className={styles.sub_heading}>Fill in the details to Create a Spot Line Booking</div>

			<ActiveComponent
				detail={detail}
				shippingLines={shippingLines}
				formProps={formProps}
				setDetentionValues={setDetentionValues}
				detentionValues={detentionValues}
			/>

			<SpotBookingInstructions shippingLines={shippingLines} loading={loading} />

			<Footer handleSubmit={handleSubmit} detentionValues={detentionValues} detail={detail} watch={watch} />
		</div>
	);
}

export default SpotBooking;
