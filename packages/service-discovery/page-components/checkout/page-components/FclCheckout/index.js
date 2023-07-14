import EditMargin from './components/EditMargin';
import PreviewBooking from './components/PreviewBooking';
import ShipmentExecution from './components/ShipmentExecution';

const COMPONENT_MAPPING = {
	add_or_edit_margin : EditMargin,
	preview_booking    : PreviewBooking,
	shipment_execution : ShipmentExecution,

};

function FclCheckout({ checkoutState = 'shipment_execution' }) {
	const ActiveComponent = COMPONENT_MAPPING[checkoutState];

	return (
		<ActiveComponent />
	);
}

export default FclCheckout;
