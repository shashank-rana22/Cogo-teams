import { cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetFclFreightRateStats from '../../../hooks/useGetFclFreightRateStats';
import SupplyRates from '../RatesList';

import Deviation from './Deviation';
import Distribution from './Distribution';
import ScallableAccuracy from './ScallableAccuracy';
import styles from './styles.module.css';
import Views from './Views';

function DashboardView(props) {
	const [isHighlighted, setIsHighlighted] = useState(false);
	const { setView = () => {}, globalFilters = {}, setGlobalFilters = () => {} } = props;
	const { parent_mode } = globalFilters;

	const {
		data, loading,
	} = useGetFclFreightRateStats({ filters: globalFilters });

	const { accuracy = [], deviation = [], ...rest } = data || {};
	return (
		<>
			<div className={styles.main_container}>
				<div className={cl`${styles.graph_container} ${isHighlighted ? styles.highlight : ''}`}>
					<ScallableAccuracy
						accuracy={accuracy}
						loading={loading}
						parent_mode={parent_mode}
						isHighlighted={isHighlighted}
						setIsHighlighted={setIsHighlighted}
						globalFilters={globalFilters}
						setGlobalFilters={setGlobalFilters}
					/>
					<Deviation data={deviation} loading={loading} />
				</div>
				<div className={cl`${styles.side_container} ${isHighlighted ? styles.minimise : ''}`}>
					<Views setView={setView} data={rest} loading={loading} />
					<Distribution {...props} />
				</div>
			</div>
			{parent_mode
			&& (
				<SupplyRates
					heading={`${startCase(parent_mode)} ${parent_mode.includes('rate') ? '' : 'Rates'}`}
					{...props}
				/>
			)}
		</>
	);
}

export default DashboardView;
