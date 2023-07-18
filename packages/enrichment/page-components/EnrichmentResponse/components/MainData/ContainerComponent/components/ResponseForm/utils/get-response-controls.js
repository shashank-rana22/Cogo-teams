import getAddressControls from './get-address-controls';
import getUserControls from './get-user-controls';

const getResponseControls = ({ activeTab = '' }) => {
	const CONTROLS_MAPPING = {
		address : getAddressControls,
		user    : getUserControls,
	};

	return CONTROLS_MAPPING[activeTab];
};

export default getResponseControls;
