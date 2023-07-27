import BookingConfirmation from './components/BookingConfirmation';
import EditMargin from './components/EditMargin';
import PreviewBooking from './components/PreviewBooking';
import styles from './styles.module.css';

const COMPONENT_MAPPING = {
	draft                : EditMargin,
	locked               : PreviewBooking,
	booking_confirmation : BookingConfirmation,

};

function FclCheckout({ state = 'draft' }) {
	const ActiveComponent = COMPONENT_MAPPING.booking_confirmation;

	return (
		<div className={styles.container}>
			<ActiveComponent />
		</div>
	);
}

export default FclCheckout;
