import BookingConfirmation from './components/BookingConfirmation';
import EditMargin from './components/EditMargin';
import PreviewBooking from './components/PreviewBooking';
import styles from './styles.module.css';

const COMPONENT_MAPPING = {
	save_for_later       : EditMargin,
	draft                : EditMargin,
	locked               : PreviewBooking,
	booking_confirmation : BookingConfirmation,

};

function FclCheckout({ state = 'draft', setIsShipmentCreated = () => {} }) {
	const ActiveComponent = COMPONENT_MAPPING[state] || COMPONENT_MAPPING.draft;

	return (
		<div className={styles.container}>
			<ActiveComponent
				setIsShipmentCreated={setIsShipmentCreated}
				state={state}
			/>
		</div>
	);
}

export default FclCheckout;
