const getCommonAgentType = ({ viewType = '' }) => {
	if (viewType.includes('supply')) {
		return 'supply';
	}

	if (viewType.includes('sales')) {
		return 'sales';
	}

	if (viewType.includes('support')) {
		return 'support';
	}

	if (viewType.includes('shipment_specialist')) {
		return 'shipment_specialist';
	}

	return '';
};

export default getCommonAgentType;
