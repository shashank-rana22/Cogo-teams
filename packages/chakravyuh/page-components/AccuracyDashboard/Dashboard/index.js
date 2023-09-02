import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
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
	const { start_date, end_date, parent_mode } = globalFilters;

	const {
		data, loading,
	} = useGetFclFreightRateStats({ filters: globalFilters });

	const { accuracy = [], deviation = [], ...rest } = data || {};

	let dateString = [];
	if (start_date) {
		dateString.push(` from ${formatDate({
			date       : start_date,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			formatType : 'date',
		})}`);
	}
	if (end_date) {
		dateString.push(` till ${formatDate({
			date       : end_date,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			formatType : 'date',
		})}`);
	}

	if (dateString.length === GLOBAL_CONSTANTS.zeroth_index) {
		dateString = 'showing all time values';
	} else {
		dateString = dateString.join(' -');
	}
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
						dateString={dateString}
					/>
					<Deviation data={deviation} loading={loading} dateString={dateString} />
				</div>
				<div className={cl`${styles.side_container} ${isHighlighted ? styles.minimise : ''}`}>
					<Views setView={setView} data={rest} loading={loading} />
					<Distribution {...props} dateString={dateString} />
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
