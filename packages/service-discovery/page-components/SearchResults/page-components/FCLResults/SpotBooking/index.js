import { cl } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import CustomLoadingState from '../../../../../common/LoadingState/CustomLoadingState';
import SpotBookingInstructions from '../../../../../common/SpotBookingInstructions';
import useListOperators from '../../../../../common/SpotBookingInstructions/hooks/useListOperators';

import FclCard from './FclCard';
import Footer from './Footer';
import styles from './styles.module.css';

const MAPPING = {
	fcl_freight: FclCard,
};

function SpotBooking({ detail = {}, setScreen = () => {} }) {
	const { service_type = '', spot_line_config = {} } = detail;

	const { shipping_line_ids = [] } = spot_line_config;

	const [detentionValues, setDetentionValues] = useState({
		origin_detention      : 4,
		origin_demurrage      : 4,
		destination_detention : 4,
		destination_demurrage : 4,
	});
	const [finalLoading, setFinalLoading] = useState(false);

	const { shippingLines = [], loading } = useListOperators({ shipping_line_ids });

	const { handleSubmit = () => {}, watch = () => {}, ...formProps } = useForm();

	const ActiveComponent = MAPPING[service_type];

	if (!ActiveComponent) {
		return null;
	}

	return (
		<div className={cl`${styles.container} ${finalLoading && styles.loading}`}>
			{finalLoading ? <CustomLoadingState /> : null}

			<div className={styles.heading}>Spotline Booking</div>
			<div className={styles.sub_heading}>Fill in the details to Create a Spot Line Booking</div>

			<ActiveComponent
				detail={detail}
				shippingLines={shippingLines}
				formProps={formProps}
				setDetentionValues={setDetentionValues}
				detentionValues={detentionValues}
				watch={watch}
			/>

			<SpotBookingInstructions shippingLines={shippingLines} loading={loading} />

			<Footer
				handleSubmit={handleSubmit}
				detentionValues={detentionValues}
				detail={detail}
				watch={watch}
				setFinalLoading={setFinalLoading}
				finalLoading={finalLoading}
				setScreen={setScreen}
			/>
		</div>
	);
}

export default SpotBooking;
