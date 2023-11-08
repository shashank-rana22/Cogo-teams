import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRouter } from '@cogoport/next';
import { startOfDay } from '@cogoport/utils';
import React, { useState } from 'react';

import Header from './Header';
import SmeComponents from './SmeComponents';
import styles from './styles.module.css';

function SmeDashboard() {
	const { query = '' } = useRouter();

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
