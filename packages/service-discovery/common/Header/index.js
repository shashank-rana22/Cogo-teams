import { cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import AIRHeader from './AIRHeader';
import ExtraHeader from './common/ExtraHeader';
import FCLHeader from './FCLHeader';
import FTLHeader from './FTLHeader';
import LCLHeader from './LCLHeader';
import LTLHeader from './LTLHeader';
import styles from './styles.module.css';

const HEADER_COMPONENT_MAPPING = {
	fcl_freight : FCLHeader,
	air_freight : AIRHeader,
	lcl_freight : LCLHeader,
	ftl_freight : FTLHeader,
	ltl_freight : LTLHeader,
};

function Header(props = {}) {
	const {
		data = {},
		service_key = 'service_type',
		showAdditionalHeader = false,
		headerProps = {},
	} = props || {};

	const service_type = data[service_key] || '';

	const ActiveHeader = HEADER_COMPONENT_MAPPING[service_type];

	if (!service_type || isEmpty(data) || !ActiveHeader) return null;

	return (
		<div className={cl`${styles.container} ${showAdditionalHeader ? styles.show : {}}`}>
			<ActiveHeader {...props} />

			{showAdditionalHeader ? (
				<ExtraHeader headerProps={headerProps} />
			) : null}
		</div>
	);
}

export default Header;
