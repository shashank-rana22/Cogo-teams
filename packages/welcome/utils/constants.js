import {
	IcMCalendar,
	// IcMTimer, IcMUpwardGraph,
	IcMCart,
	IcMAppInvoiceSubmission,
	IcMProfile,
	IcMAppPayment,
	IcMAppUploadDocument,
} from '@cogoport/icons-react';

export const HEADER_NAV = [
	{
		label : 'Attendance',
		icon  : IcMCalendar,
		route : '/attendance-leave-management',
	},
	{
		label : 'Cogomerch',
		icon  : IcMCart,
		route : '/cogo-store',
	},

	// {
	// 	label : 'Time Off',
	// 	icon  : IcMTimer,
	// },
	// {
	// 	label : 'Performance',
	// 	icon  : IcMUpwardGraph,
	// },
	{
		label : 'Payments',
		icon  : IcMAppInvoiceSubmission,
		route : '/payment',
	},
	{
		label : 'Payroll',
		icon  : IcMAppPayment,
		route : '/payroll',
	},
	{
		label : 'Policies',
		icon  : IcMAppUploadDocument,
		route : '',
	},
	// {
	// 	label : 'Tax Submissions',
	// 	icon  : IcMAppInvoiceSubmission,
	// },
	{
		label : 'Profile',
		icon  : IcMProfile,
		route : '/profile',
	},
];
