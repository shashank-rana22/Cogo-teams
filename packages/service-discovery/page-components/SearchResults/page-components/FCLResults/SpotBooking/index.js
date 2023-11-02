import SpotBookingInstructions from '../../../../../common/SpotBookingInstructions';
import useListOperators from '../../../../../common/SpotBookingInstructions/hooks/useListOperators';

import FclCard from './FclCard';
import styles from './styles.module.css';

const MAPPING = {
	fcl_freight: FclCard,
};

function SpotBooking({ detail = {} }) {
	const { service_type = '' } = detail;

	const { shippingLines = [], loading } = useListOperators();

	const ActiveComponent = MAPPING[service_type];

	if (!ActiveComponent) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Spotline Booking</div>
			<div className={styles.sub_heading}>Fill in the details to Create a Spot Line Booking</div>

			<ActiveComponent detail={detail} shippingLines={shippingLines} />

			<SpotBookingInstructions shippingLines={shippingLines} loading={loading} />
		</div>
	);
}

export default SpotBooking;
