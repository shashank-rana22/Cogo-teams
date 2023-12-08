/* eslint-disable max-lines-per-function */
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcMDocument,
	// IcMDashboard,
} from '@cogoport/icons-react';

import apis from './apis';
// import business_finance from './apis/business-finance-apis';

const navigationMapping = ({ t = () => {} }) => {
	const navigationMappingAdmin = {
		ticket_management: {
			key       : 'ticket_management',
			title     : t('common:ticket_management'),
			isSubNavs : true,
			icon      : IcMDocument,
			options   : [
				{
					key           : 'ticket_management-ticket_management_dashboard',
					title         : t('common:dashboard'),
					href          : '/ticket-management/dashboard',
					as            : '/ticket-management/dashboard',
					type          : 'link',
					main_apis     : [],
					possible_apis : apis.ticket_management,
				},
				{
					key           : 'ticket_management-my_tickets',
					title         : t('common:my_tickets'),
					href          : '/v2/ticket-management/my-tickets',
					as            : '/v2/ticket-management/my-tickets',
					type          : 'link',
					main_apis     : [],
					possible_apis : apis.ticket_management,
				},
				{
					key           : 'ticket_management-super_admin',
					title         : t('common:admin_dashboard'),
					href          : '/v2/ticket-management/super-admin',
					as            : '/v2/ticket-management/super-admin',
					type          : 'link',
					main_apis     : [],
					possible_apis : apis.ticket_management,
				},
				{
					key           : 'ticket_management-ticket_configurations',
					title         : t('common:ticket_configurations'),
					href          : '/ticket-management/configurations',
					as            : '/ticket-management/configurations',
					type          : 'link',
					main_apis     : [],
					possible_apis : apis.ticket_management,
				},
			],
		},
		cogo_one: {
			key   : 'cogo_one',
			title : t('common:cogo_one'),
			icon  : () => (
				<img
					src={GLOBAL_CONSTANTS.image_url.cogo_one_svg}
					alt="cogo-one"
					width="22px"
					height="22px"
				/>
			),
			isSubNavs     : true,
			main_apis     : [],
			possible_apis : apis.cogo_one,
			options       : [
				{
					key           : 'cogo_one-omni_channel',
					title         : t('common:omni_channel'),
					href          : '/v2/cogo-one/omni-channel',
					as            : '/v2/cogo-one/omni-channel',
					type          : 'link',
					main_apis     : [],
					possible_apis : apis.cogo_one,
				},
			],
			module_type: 'dashboards',
		},
	};

	return navigationMappingAdmin;
};

export default navigationMapping;
