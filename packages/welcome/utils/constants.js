import {
	IcMCalendar,
	// IcMTimer, IcMUpwardGraph,
	IcMAppInvoiceSubmission,
	IcMProfile,
	IcMAppPayment,
} from '@cogoport/icons-react';

export const HEADER_NAV = [
	{
		label : 'Attendance',
		icon  : IcMCalendar,
		route : '/attendance-leave-management',
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
		label : 'Payslip',
		icon  : IcMAppInvoiceSubmission,
		route : '/payroll?is_payslip=payslip',
	},
	{
		label : 'Payroll',
		icon  : IcMAppPayment,
		route : '/payroll/payroll',
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
