import { isEmpty } from '@cogoport/utils';

const checkElementAllowed = ({ showElement, watchShipmentMode, watchServiceType }) => {
	if (isEmpty(showElement)) return true;

	const { shipmentMode = [], serviceType = [] } = showElement;

	return shipmentMode.includes(watchShipmentMode) || serviceType.includes(watchServiceType);
};

export default checkElementAllowed;
