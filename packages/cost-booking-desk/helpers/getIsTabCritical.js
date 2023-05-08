import TABS from '../config/TABS_CONFIG';

const getIsTabCritical = ({ shipmentType = '', stepperTab = '', activeTab = '' }) => {
	const tabConfig = TABS[shipmentType]?.[stepperTab]?.find((i) => i?.name === activeTab);

	return !!tabConfig?.isCriticalVisible;
};

export default getIsTabCritical;
