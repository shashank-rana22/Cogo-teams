const MAPPING = {
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

const tradePartyTypeMapping = (trade_party_type = '') => MAPPING[trade_party_type] || MAPPING.default;

export default tradePartyTypeMapping;
