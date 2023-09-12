import VIEW_SELECTED_CONFIG from '../CreatePayrun/Configurations/viewSelectedConfig.json';
import VIEW_SELECTED_CONFIG_VN from '../CreatePayrun/Configurations/viewSelectedConfigVN.json';
import CREATE_OVER_SEAS_CONFIG from '../OverSeasAgent/Configurations/createOverSeasConfig.json';
import CREATE_OVER_SEAS_CONFIG_VN from '../OverSeasAgent/Configurations/createOverSeasConfigVN.json';

const CREATE_OVERSEAS_CONFIG_MAPPING = {
	IN : CREATE_OVER_SEAS_CONFIG,
	VN : CREATE_OVER_SEAS_CONFIG_VN,
};

const VIEW_SELECTED_CONFIG_MAPPING = {
	IN : VIEW_SELECTED_CONFIG,
	VN : VIEW_SELECTED_CONFIG_VN,
};

function getConfig({ country = '', viewSelectedInvoice = false }) {
	const createOverSeasConfig = CREATE_OVERSEAS_CONFIG_MAPPING[country];
	const viewSelectedConfig = VIEW_SELECTED_CONFIG_MAPPING[country];
	return (viewSelectedInvoice ? viewSelectedConfig : createOverSeasConfig);
}

export default getConfig;
