import { cl } from '@cogoport/components';
import { IcMInfo, IcCCountryIndia } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Filter from '../../../commons/Filters';
import { treasuryControls } from '../controls';

import styles from './styles.module.css';

function TreasuryStatistics({ filters, setFilters }) {
	const tab = [
		{
			key   : 'all',
			label : 'ALL',
		},
		{
			key   : 'entity_101 ',
			label : 'Entity 101',
			icon  : <IcCCountryIndia height={15} width={15} />,

		},
		{
			key   : 'entity_301 ',
			label : 'Entity 301',
			icon  : <IcCCountryIndia height={15} width={15} />,

		},

	];
	const [tabs, setTabs] = useState('all');
	return (
		<div>
			<div className={cl`${styles.card} ${styles.filter_button}`}>
				<div className={styles.main}>
					<div>
						<div className={styles.filters_styles}>
							<div>
								Treasury Statistics
								<IcMInfo />
								<div className={styles.border} />
							</div>
							<div>
								<Filter
									controls={treasuryControls}
									filters={filters}
									setFilters={setFilters}
								/>
							</div>
						</div>
					</div>
					<div className={styles.container}>
						<div className={styles.flex}>
							{tab.map((item) => (
								<div
									key={item.key}
									onClick={() => {
										setTabs(item.key);
									}}
								>
									<div className={item.key === tabs ? styles.sub_container_click : styles.sub_container}>
										{item.label}
										<div>{item.icon}</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className={styles.around_border}>
						<div className={styles.text}>No. of Accounts - 8</div>

						<div className={styles.border_left} />
						<div>
							Allocated Funds
							<div className={styles.amount_style}>INR 5,40,000</div>
						</div>
						<div className={styles.text_style}>
							Utilized Funds
							<div className={styles.amount_style}>INR 5,40,000</div>
						</div>
						<div className={styles.text_style}>
							Balance Amount
							<div className={styles.amount_style}>INR 5,40,000</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TreasuryStatistics;
