import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import useGetMonthlySummary from '../../../hooks/useGetMonthlySummary';
import { MONTHLY_SUMMARY_CONFIGS } from '../../../utils/constants';
import { getDecimalValue } from '../../../utils/getDecimalValue';

import styles from './styles.module.css';

function Summary({ cycle = '' }) {
	const { loading, data = {} } = useGetMonthlySummary(cycle);

	function GetData({ val }) {
		if (loading) {
			return <Placeholder height="30px" width="100px" />;
		}

		const value = data[val.key];

		if (val.showHrs) {
			const sign = value?.charAt(GLOBAL_CONSTANTS.zeroth_index);
			const className = sign === '-' ? 'negative_deviation' : 'positive_deviation';
			return (
				<div className={val.showColor && styles[className]}>
					{value}
					{' '}
					Hrs
				</div>
			);
		}

		return getDecimalValue(value);
	}

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				Monthly Summary
			</div>
			<div className={styles.summary_container}>
				{MONTHLY_SUMMARY_CONFIGS.map((val) => (
					<div key={val.key} className={styles.item}>
						<div className={styles.label}>
							{val.label}
						</div>
						<div className={styles.num_value}>
							<GetData val={val} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Summary;
