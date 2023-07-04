import { Toggle } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useGetMonthwiseStats from '../hooks/useGetMonthwiseStats';

import BarGraphView from './BarGraphView';
import LinearGraphView from './LinearGraphView';
import StatsLoader from './StatsLoader';
import styles from './styles.module.css';

function Stats() {
	const [isGraphView, setIsGraphView] = useState(true);
	const { statsData, loading } = useGetMonthwiseStats({ statsFilter: {} });

	const linearData = [
		{
			id   : 'Total Outstanding',
			data : (statsData || []).map((item) => ({
				x : `${item?.month} (${item?.year})`,
				y : item?.outstandingAmount,
			})),
		},
		{
			id   : 'Collected',
			data : (statsData || []).map((item) => ({
				x : `${item?.month} (${item?.year})`,
				y : item?.collectedAmount,
			})),
		},
	];

	const barData = (statsData || []).map((item) => {
		const { month, collectedAmount, outstandingAmount, year } = item || {};
		return (
			{
				month                : `${month} (${year})`,
				'Collected Amount'   : collectedAmount,
				'Outstanding Amount' : outstandingAmount,
			}
		);
	});

	return (
		<div>
			<div className={styles.header}>
				<div className={styles.flex_align}>
					<div className={styles.subject}>Statistics</div>
					<div><IcMInfo /></div>
				</div>
				<div>
					<Toggle
						name="view"
						size="md"
						disabled={false}
						onLabel="Linear View"
						offLabel="Graph View"
						onChange={() => setIsGraphView(!isGraphView)}
					/>
				</div>
			</div>
			{!loading ?	(
				<div>
					{isGraphView ? (
						<BarGraphView
							barData={barData}
						/>
					)
						: (
							<div className={styles.linear_graph_container}>
								<LinearGraphView
									linearData={linearData}
								/>
							</div>
						)}

				</div>
			) : (
				<div className={styles.loader}>
					<StatsLoader />
				</div>
			)}

		</div>
	);
}

export default Stats;
