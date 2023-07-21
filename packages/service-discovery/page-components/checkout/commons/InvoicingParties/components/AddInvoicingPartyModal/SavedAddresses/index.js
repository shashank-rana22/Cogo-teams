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
	setShowAddInvoicingPartyModal = () => {},
	services = [],
	rate = {},
	paymentModes = {},
	getCheckoutInvoices = () => {},
	primary_service = '',
}) {
	const componentProps = {
		select_address: {
			bookingType,
			disabledInvoicingParties,
			activeState,
			setActiveState,
			setCurrentView,
			setSelectedAddress,
			source,
		},
		select_services: {
			selectedAddress,
			setCurrentView,
			setSelectedAddress,
			setShowAddInvoicingPartyModal,
			services,
			rate,
			getCheckoutInvoices,
			primary_service,
		},
	};

	const ActiveComponent = COMPONENT_MAPPING[currentView];
	const activeComponentprops = componentProps[currentView];

	return (
		<ActiveComponent {...activeComponentprops} />
	);
}

export default SavedAddresses;
