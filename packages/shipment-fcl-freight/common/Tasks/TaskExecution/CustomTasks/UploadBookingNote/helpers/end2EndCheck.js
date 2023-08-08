import getTradeTypeByIncoTerm from '@cogoport/globalization/utils/getTradeTypeByIncoTerm';

const end2EndCheck = (serviceObj, shipment_data, incoTerm) => {
	if (serviceObj.service_type === 'fcl_freight_service') {
		return true;
	}
	if (shipment_data?.end_to_end_shipment?.is_possible) {
		const tradeType = getTradeTypeByIncoTerm(incoTerm);

		if ((serviceObj.trade_type === 'import' && tradeType === 'export')
        || (serviceObj.trade_type === 'export' && tradeType === 'import')) {
			return false;
		}
	}
	return true;
};
export default end2EndCheck;
