import { Tooltip, Toggle } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Filter from '../../../../commons/Filters';
import useInvoiceStatistics from '../../../hooks/useinvoiceStatistics';

import { filterControls } from './control';
import styles from './styles.module.css';
import TabData from './TabData';

function DailySales({ filterValue }) {
	const [filters, setFilters] = useState({});
	const [subActiveTab, setSubActiveTab] = useState<string>('SALES_INVOICE');
	const [toggleData, setToggleData] = useState(false);
	const { dailyStatsData, loading } = useInvoiceStatistics({ filters, filterValue, subActiveTab });

	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<div>
					<div className={styles.journey}>
						Daily Sales Statistics
						<Tooltip content="Daily Sales Statistics" placement="top">
							<div className={styles.icon}><IcMInfo /></div>
						</Tooltip>

					</div>
					<div className={styles.border} />
				</div>

				<div className={styles.flex}>
					<Toggle
						name="toggle"
						size="md"
						onChange={(event) => { setToggleData(event?.target?.checked); }}
						showOnOff
						offLabel="Line Graph View"
						disabled={false}
					/>
					<Filter filters={filters} setFilters={setFilters} controls={filterControls()} />
				</div>
			</div>

			<div className={styles.sub_container}>
				<TabData
					toggleData={toggleData}
					loading={loading}
					dailyStatsData={dailyStatsData}
					subActiveTab={subActiveTab}
					setSubActiveTab={setSubActiveTab}
					filters={filters}
					filterValue={filterValue}
				/>
			</div>
		</div>
	);
}
export default DailySales;
