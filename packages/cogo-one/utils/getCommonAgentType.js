const getCommonAgentType = ({ viewType }) => {
	if (viewType.includes('supply')) {
		return 'supply';
	}

	if (viewType.includes('sales')) {
		return 'sales';
	}

	if (viewType.includes('support')) {
		return 'support';
	}

	if (viewType === 'shipment_specialist') {
		return 'shipment_specialist';
	}

	return undefined;
};

export default getCommonAgentType;
