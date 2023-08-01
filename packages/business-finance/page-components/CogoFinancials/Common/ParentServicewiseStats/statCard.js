import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const DEFAULT_INDEX = 1;

function StatCard({
	mappingCards = [], service = '', isMain = false,
	setActiveService = () => {},
	singleServiceData = [],
	taxType = '',
	displayAmount = () => {},
}) {
	const { currency, invoiceCount = 0, jobCount = 0 } = singleServiceData || [];
	return (
		<div
			key={service}
			className={cl`${styles.statscontainer} ${!isMain && styles.border}`}
			style={{ cursor: !isMain ? 'pointer' : null }}
			role="presentation"
			onClick={() => setActiveService(service)}
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
							{isMain ? item?.value
								: displayAmount(singleServiceData[`${item.name}${taxType}`], currency)}
						</div>
						<div className={cl`${styles.statval}
					${!isMain && styles.fontstatval}`}
						>
							{isMain ? item.stats : `${invoiceCount} Invoices | ${jobCount} Shimpents`}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default StatCard;
