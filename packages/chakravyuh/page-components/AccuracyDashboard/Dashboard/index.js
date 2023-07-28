import { startCase } from '@cogoport/utils';
import React from 'react';

import useGetFclFreightRateStats from '../../../hooks/useGetFclFreightRateStats';
import SupplyRates from '../RatesList';

import Accuracy from './Accuracy';
import Deviation from './Deviation';
import Distribution from './Distribution';
import styles from './styles.module.css';
import Views from './Views';

function DashboardView(props) {
	const { setView = () => {}, globalFilters = {} } = props;
	const { mode } = globalFilters;

	const {
		data, loading,
	} = useGetFclFreightRateStats({ filters: globalFilters });

	const { accuracy = [], deviation = [], ...rest } = data || {};
	return (
		<>
			<div className={styles.main_container}>
				<div className={styles.graph_container}>
					<Accuracy data={accuracy} loading={loading} />
					<Deviation data={deviation} loading={loading} />
				</div>
				<div className={styles.side_container}>
					<Views setView={setView} data={rest} loading={loading} />
					<Distribution {...props} />
				</div>
			</div>
			{mode && <SupplyRates heading={`${startCase(mode)} ${mode.includes('rate') ? '' : 'Rates'}`} {...props} />}
		</>
	);
}

export default DashboardView;
