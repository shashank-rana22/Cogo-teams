import EditMargin from './components/EditMargin';
import PreviewBooking from './components/PreviewBooking';
import ShipmentExecution from './components/ShipmentExecution';

const COMPONENT_MAPPING = {
	draft                : EditMargin,
	locked               : PreviewBooking,
	booking_confirmation : ShipmentExecution,

};

function FclCheckout({ state = 'draft' }) {
	const ActiveComponent = COMPONENT_MAPPING[state];

	return (
		<ActiveComponent />
	);
}

export default FclCheckout;
