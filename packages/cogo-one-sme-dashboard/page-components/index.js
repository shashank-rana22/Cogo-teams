import NotFound from '@cogoport/error/page-components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { startOfDay } from '@cogoport/utils';
import React, { useState } from 'react';

import Header from './Header';
import SmeComponents from './SmeComponents';
import styles from './styles.module.css';

function SmeDashboard() {
	const { query = {}, userId = '' } = useSelector(
		(state) => ({
			query  : state?.general?.query,
			userId : state?.profile?.user?.id,
		}),
	);

	const geo = getGeoConstants();

	const [filterParams, setFilterParams] = useState(
		() => ({
			date_range: {
				startDate : startOfDay(new Date()),
				endDate   : new Date(),
			},
			renderCount : 1,
			partner_id  : query?.partner_id,
			role_id     : [
				geo.uuid.prod_kam_ie,
				geo.uuid.prod_kam_ie_manager,
				geo.uuid.ie_owner_sme_demand,
			],
		}),
	);

	const ALLOW_SME_DASHBOARD_FOR = GLOBAL_CONSTANTS.uuid.allow_sme_dashboard_for;

	if (!ALLOW_SME_DASHBOARD_FOR?.includes(userId)) {
		return <NotFound />;
	}

	return (
		<div className={styles.main_container}>
			<Header
				setFilterParams={setFilterParams}
				filterParams={filterParams}
			/>

			<SmeComponents
				filterParams={filterParams}
				key={filterParams?.renderCount}
			/>
		</div>
	);
}

export default SmeDashboard;
