import { cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import NoDataState from '../../../../common/NoDataState';
import useListFclFreightRateStatistics from '../../../../hooks/useListFclFreightRateStatistics';
import { section_container } from '../styles.module.css';

import ColumnChart from './ColumnChart';
import styles from './styles.module.css';

function RateAddition({ globalFilters = {}, dateString = '' }) {
	const { chart_type, ...filters } = globalFilters;
	const { data, loading } = useListFclFreightRateStatistics({ filters, query_type: 'rates_affected' });
	const { list = [] } = data || {};

	return (
		<div className={cl`${section_container} ${styles.container}`}>
			<h3 className={styles.header}>Rate Affected with Time</h3>
			<div className={cl`${styles.chart_container}`}>
				{(loading || !isEmpty(list))
					? (
						<ColumnChart
							data={list}
							loading={loading}
						/>
					)
					: <NoDataState flow="column" />}
			</div>
			<p className={styles.bottom_label}>{dateString}</p>
		</div>
	);
}

export default RateAddition;
