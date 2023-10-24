import { Loader } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import useGetMarginBookingInsights from '../../../hooks/useGetMarginBookingInsights';

import styles from './styles.module.css';

function Statistics({ marginId = '' }) {
	const { data = [], loading = false } = useGetMarginBookingInsights({
		marginId,
	});

	if (loading) {
		return (
			<div
				style={{
					flexDirection  : 'column',
					justifyContent : 'center',
					alignItems     : 'center',
					flex           : 1,
				}}
			>
				<Loader
					size={20}
					borderWidth={2}
					spinBorderColor="#303B67"
					outerBorderColor="#dce1ff"
				/>
			</div>
		);
	}

	return (
		<>
			{(data || []).map((statsType) => {
				const { count = 0, count_type = '' } = statsType || {};

				return (
					<div key={count_type} className={styles.tile}>
						<div className={styles.title}>
							{' '}
							{startCase(count_type)}
							{' '}
						</div>
						<div className={styles.count}>
							{count || 0}
							{' '}
						</div>
					</div>
				);
			})}
		</>
	);
}

export default Statistics;
