import getAddressControls from './get-address-controls';
import getUserControls from './get-user-controls';

const getResponseControls = ({ activeTab = '', responseData = {} }) => {
	const addressControls = getAddressControls({ responseData });
	const userControls = getUserControls();

	const CONTROLS_MAPPING = {
		address : addressControls,
		user    : userControls,
	};

	return CONTROLS_MAPPING[activeTab];
};

export default getResponseControls;
