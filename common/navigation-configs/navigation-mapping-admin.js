/* eslint-disable max-lines-per-function */
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
// import {
// IcMDocument,
// IcMDashboard,
// } from '@cogoport/icons-react';

import apis from './apis';
// import business_finance from './apis/business-finance-apis';

const navigationMapping = ({ t = () => {} }) => {
	const navigationMappingAdmin = {
		cogo_one: {
			key   : 'cogo_one_omni_channel',
			title : t('common:cogo_one'),
			icon  : () => (
				<img
					src={GLOBAL_CONSTANTS.image_url.cogo_one_svg}
					alt="cogo-one"
					width="22px"
					height="22px"
				/>
			),
			main_apis     : [],
			possible_apis : apis.cogo_one,
			href          : '/v2/cogo-one/omni-channel',
			as            : '/v2/cogo-one/omni-channel',
			type          : 'link',
			module_type   : 'dashboards',
		},
	};

	return navigationMappingAdmin;
};

export default navigationMapping;
