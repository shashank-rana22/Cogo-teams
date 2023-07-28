import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const DEFAULT_INDEX = 1;

function StatCard({ mappingCards = [], service = '', isMain = false }) {
	return (
		<div
			className={cl`${styles.statscontainer} ${!isMain && styles.border}`}
			style={{ cursor: !isMain ? 'pointer' : null }}
		>
			{isMain ? null : (
				<div className={styles.service}>
					{service}
					<div className={styles.underline} />
				</div>
			)}
			<div style={{
				display        : 'flex',
				justifyContent : 'space-between',
				flexDirection  : isMain ? 'column' : 'row',

			}}
			>
				{mappingCards.map((item, index) => (
					<div className={cl`${styles.stats} ${isMain && styles.margin}`} key={item.label}>
						<div className={cl`${styles.stathead} ${!isMain && styles.fontlabel}`}>
							{item.label}
						</div>
						<div className={cl`${styles.value}
					${!isMain && styles.fontvalue} 
					${mappingCards?.length === index + DEFAULT_INDEX && styles.color}`}
						>
							{item.value}
						</div>
						<div className={cl`${styles.statval}
					${!isMain && styles.fontstatval}`}
						>
							{item.stats}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default StatCard;
