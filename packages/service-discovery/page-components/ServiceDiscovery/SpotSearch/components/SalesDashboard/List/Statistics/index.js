import React from 'react';

import StatItem from './StatItem';
import styles from './styles.module.css';

const ZERO_VALUE = 0;

function Statistics({
	statsArray = [],
	statsData = {},
	setFilters = () => {},
	setBucketParams = () => {},
	activeStat,
	restFilters,
}) {
	return (
		<div className={styles.container}>
			{(statsArray || []).map((stat) => {
				const { key = '' } = stat;
				const keyValue = statsData?.[key];

				return (
					<StatItem
						key={key}
						{...(stat || {})}
						count={
							key !== 'total_count'
								? keyValue
								: keyValue - (statsData?.not_sent || ZERO_VALUE)
						}
						isActive={activeStat?.key === stat?.key}
						onClick={() => {
							setFilters({
								...(restFilters || {}),
								activeStat : stat,
								page       : 1,
								page_limit : 10,
							});
							setBucketParams(stat.params || {});
						}}
					/>
				);
			})}
		</div>
	);
}

export default Statistics;
