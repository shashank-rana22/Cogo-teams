import CONTROL_CONFIG from '../config/CONTROLS_CONFIG.json';

const getIsDateFilterVisible = ({ shipmentType = '', stepperTab = '' }) => {
	const stepperConfig = CONTROL_CONFIG?.[shipmentType]?.find((i) => i?.value === stepperTab);

	return !!stepperConfig?.isDateFilterVisible;
};

export default getIsDateFilterVisible;
