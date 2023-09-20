const getCommonAgentType = ({ viewType = '' }) => {
	if (viewType.includes('supply')) {
		return 'supply';
	}

	if (viewType.includes('sales')) {
		return 'sales';
	}

	if (viewType.includes('cp_support')) {
		return 'cp_support';
	}

	if (viewType.includes('support')) {
		return 'support';
	}

	if (viewType.includes('shipment_specialist')) {
		return 'shipment_specialist';
	}

	if (viewType.includes('credit_controller')) {
		return 'credit_controller';
	}

	if (viewType.includes('marketing')) {
		return 'marketing';
	}

	return '';
};

export default getCommonAgentType;
