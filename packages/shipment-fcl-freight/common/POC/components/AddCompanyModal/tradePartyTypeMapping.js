const tradePartyTypeMapping = (trade_party_type = '') => {
	const mapping = {
		shipper: [
			{
				value : 'same_as_booking_party',
				label : 'Same as Booking Party',
			},
			{
				value : 'self',
				label : 'Self',
			},
			{
				value : 'trade_partner',
				label : 'Select Trade Partner',
			},
			{
				value : 'create_new_company',
				label : 'Create New Company',
			},
			{
				value : 'historical',
				label : 'Historical',
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
			{
				value : 'historical',
				label : 'Historical',
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

	return mapping[trade_party_type] || mapping.default;
};

export default tradePartyTypeMapping;
