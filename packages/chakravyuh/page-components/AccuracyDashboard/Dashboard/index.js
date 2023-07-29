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
	const { setView = () => {}, globalFilters = {} } = props;
	const { mode } = globalFilters;

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
						mode={mode}
						isHighlighted={isHighlighted}
						setIsHighlighted={setIsHighlighted}
					/>
					<Deviation data={deviation} loading={loading} />
				</div>
				<div className={cl`${styles.side_container} ${isHighlighted ? styles.minimise : ''}`}>
					<Views setView={setView} data={rest} loading={loading} />
					<Distribution {...props} />
				</div>
			</div>
			{mode && <SupplyRates heading={`${startCase(mode)} ${mode.includes('rate') ? '' : 'Rates'}`} {...props} />}
		</>
	);
}

export default DashboardView;
