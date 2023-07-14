import SelectAddress from './components/SelectAddress';
import SelectServices from './components/SelectServices';

const COMPONENT_MAPPING = {
	select_address  : SelectAddress,
	select_services : SelectServices,
};

function SavedAddresses({
	bookingType = '',
	disabledInvoicingParties = [],
	currentView = '',
	activeState = '',
	setActiveState = () => {},
	setCurrentView = () => {},
	selectedAddress = {},
	setSelectedAddress = () => {},
	source = '',
}) {
	const componentProps = {
		select_address: {
			bookingType,
			disabledInvoicingParties,
			activeState,
			setActiveState,
			setCurrentView,
			selectedAddress,
			setSelectedAddress,
			source,
		},
		select_services: {},
	};

	const ActiveComponent = COMPONENT_MAPPING[currentView];
	const activeComponentprops = componentProps[currentView];

	return (
		<div>
			<ActiveComponent {...activeComponentprops} />
		</div>
	);
}

export default SavedAddresses;
