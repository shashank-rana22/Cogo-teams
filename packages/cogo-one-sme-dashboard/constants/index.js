import {
	IcMEmail,
	IcCWhatsapp,
	IcCCountryIndia,
	IcCCountryNetherland,
	IcCCountrySingapore,
	IcCCountryVietnam,
	IcCIndonesiaCircular,
	IcCThailandCircular,
	IcCChinaCircular,
} from '@cogoport/icons-react';

export const COUNTRIES_TO_SHOW = ['IN', 'NL', 'SG', 'VN', 'TH', 'ID', 'CN'];

export const ICONS_MAPPING = {
	email    : IcMEmail,
	whatsapp : IcCWhatsapp,
	IN       : IcCCountryIndia,
	NL       : IcCCountryNetherland,
	SG       : IcCCountrySingapore,
	VN       : IcCCountryVietnam,
	TH       : IcCThailandCircular,
	ID       : IcCIndonesiaCircular,
	CN       : IcCChinaCircular,
	emails   : IcMEmail,
};

export const CUSTOMER_INTERACTION_LABEL_MAPPING = [
	{
		label       : 'Calls made',
		value       : 'total_calls',
		allocated   : 'allocated_total_calls',
		unallocated : 'unallocated_total_calls',
	},
	{
		label       : 'Calls connected',
		value       : 'total_calls_connected',
		allocated   : 'allocated_calls_connected',
		unallocated : 'unallocated_calls_connected',
	},
	{
		label       : 'Quotations Sent',
		value       : 'total_quotation_count',
		allocated   : 'allocated_quotation_count',
		unallocated : 'unallocated_quotation_count',
	},
	{
		label       : 'Bookings',
		value       : 'total_booked_shipments',
		allocated   : 'allocated_booked_shipments',
		unallocated : 'unallocated_booked_shipments',
	},
];

export const COMMON_COLORS = [
	'#88CAD1', '#FDE74D', '#F9AE64', '#F2E3C3', '#ABCD62',
	'#ABB0DE', '#CFEAED', '#F8AEA8', '#CFBC93', '#888FD1',
	'#ECF1FC', '#F37166', '#FDEBE9', '#E67240', '#4F4F4F',
];
