import {
	IcMBookingDesk, IcMSettings, IcMFfcl, IcMBldesk,
} from '@cogoport/icons-react';

import roles_permissions from './apis/roles-n-permission-apis';
import shipment_apis from './apis/shipment-apis';

const navigationMappings = {
	home: {
		key           : 'home',
		title         : 'Home',
		href          : '/home',
		as            : '/home',
		icon          : IcMBookingDesk,
		possible_apis : [],
		module_type   : 'dashboards',
	},
	coe: {
		key         : 'coe',
		title       : 'Center of Excellence [COE]',
		href        : '/coe',
		as          : '/coe',
		icon        : IcMBldesk,
		module_type : 'dashboards',
		options     : [
			{
				key           : 'coe-booking_desk',
				title         : 'Booking Desk',
				href          : '/coe/booking-desk',
				as            : '/coe/booking-desk',
				icon          : IcMBookingDesk,
				main_apis     : ['list_shipments'],
				possible_apis : [...shipment_apis],
			},
			{
				key           : 'coe-revenue_desk_fcl_freight',
				title         : 'FCL Revenue Desk',
				href          : '/coe/revenue-desk/fcl-freight',
				as            : '/coe/revenue-desk/fcl-freight',
				icon          : IcMFfcl,
				main_apis     : ['list_shipments'],
				possible_apis : [...shipment_apis],
			},
		],
	},
	roles_permissions: {
		key           : 'roles_permissions',
		title         : 'Roles and Permissions',
		icon          : IcMSettings,
		href          : '/list-roles',
		as            : '/list-roles',
		type          : 'link',
		main_apis     : ['list_auth_roles'],
		possible_apis : [...roles_permissions],
		module_type   : 'crm',
	},
};

export default navigationMappings;
