import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import { DEFAULT_GLOBAL_FILTERS } from '../../../constants/default_global_filters';
import useGetFclFreightRateStats from '../../../hooks/useGetFclFreightRateStats';
import SupplyRates from '../RatesList';

import Distribution from './Distribution';
import RateAddition from './RateAddition';
import ScallableAccuracy from './ScallableAccuracy';
import styles from './styles.module.css';
import Views from './Views';

function DashboardView(props) {
	const [isHighlighted, setIsHighlighted] = useState(false);
	const { setView = () => {}, globalFilters = {}, setGlobalFilters = () => {} } = props;
	const { start_date, end_date, parent_mode, service_type } = globalFilters;

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

	useEffect(() => {
		if (service_type === 'air') {
			setIsHighlighted(true);
			setGlobalFilters({ ...DEFAULT_GLOBAL_FILTERS, service_type });
		} else {
			setIsHighlighted(false);
			setGlobalFilters({ ...DEFAULT_GLOBAL_FILTERS, service_type });
		}
	}, [service_type, setIsHighlighted, setGlobalFilters]);

	return (
		<>
			<div className={cl`${styles.main_container} ${isHighlighted ? styles.max_view : ''}`}>
				<div className={cl`${styles.graph_container} ${isHighlighted ? styles.highlight : ''}`}>
					<ScallableAccuracy
						loading={loading}
						accuracy={accuracy}
						deviation={deviation}
						dateString={dateString}
						parent_mode={parent_mode}
						isHighlighted={isHighlighted}
						globalFilters={globalFilters}
						setIsHighlighted={setIsHighlighted}
						setGlobalFilters={setGlobalFilters}
					/>
					<RateAddition
						key={`rate_addition_graph_${isHighlighted ? 'hidden' : 'visible'}`}
						dateString={dateString}
						globalFilters={globalFilters}
					/>
				</div>
				<div className={cl`${styles.side_container} ${isHighlighted ? styles.minimise : ''}`}>
					<Views
						setView={setView}
						data={rest}
						loading={loading}
					/>
					<Distribution
						{...props}
						dateString={dateString}
					/>
				</div>
			</div>
			{
				service_type === 'fcl'
					? (
						<SupplyRates
							heading={`${startCase(parent_mode || 'All')} 
							${parent_mode?.includes('rate') ? '' : 'Rates'}`}
							{...props}
						/>
					) : null
			}
		</>
	);
}

export default DashboardView;
