const SAME_AS_BOOKING_PARTY_OBJ = {
	value : 'same_as_booking_party',
	label : 'Same as Booking Party',
};

const tradePartyTypeMapping = (trade_party_type = '', trade_type = '') => {
	const MAPPING = {
		shipper: [
			{
				value : 'trade_partner',
				label : 'Select Trade Partner',
			},
			{
				value : 'create_new_company',
				label : 'Create New Company',
			},
		],
		consignee: [
			{
				value : 'trade_partner',
				label : 'Select Trade Partner',
			},
			{
				value : 'create_new_company',
				label : 'Create New Company',
			},
		],
		self: [
			{
				value : 'self',
				label : 'Self',
			},
			{
				value : 'trade_partner',
				label : 'Select Trade Partner',
			},
		],
		default: [
			{
				value : 'trade_partner',
				label : 'Select Trade Partner',
			},
			{
				value : 'create_new_company',
				label : 'Create New Company',
			},
		],
	};

	if (trade_type === 'export') {
		MAPPING.shipper.unshift(SAME_AS_BOOKING_PARTY_OBJ);
	} else if (trade_type === 'import') {
		MAPPING.consignee.unshift(SAME_AS_BOOKING_PARTY_OBJ);
	}

	return MAPPING[trade_party_type] || MAPPING.default;
};

export default tradePartyTypeMapping;
