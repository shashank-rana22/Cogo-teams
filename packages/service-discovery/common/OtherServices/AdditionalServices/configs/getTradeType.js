const getTradeType = ({ service_name = '', trade_type = '' }) => {
	if (service_name.includes('export')) {
		return 'export';
	}
	if (service_name.includes('import')) {
		return 'import';
	}

	return trade_type;
};
export default getTradeType;
