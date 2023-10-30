/* eslint-disable react-hooks/exhaustive-deps */
import { Tooltip, Toggle } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

import Filter from '../../../../commons/Filters';
import useInvoiceStatistics from '../../../hooks/useinvoiceStatistics';
import { filterControls } from '../../../Utils/filterControls';

import styles from './styles.module.css';
import TabData from './TabData';

function DailySales({ filterValue, entityCode }) {
	const { t = () => '' } = useTranslation(['accountRecievables']);

	const [filters, setFilters] = useState({});
	const [subActiveTab, setSubActiveTab] = useState('SALES_INVOICE');
	const [toggleData, setToggleData] = useState(false);
	const [disabledConfig, setDisabledConfig] = useState({
		date  : false,
		month : false,
		year  : false,
	});
	const { dailyStatsData, loading } = useInvoiceStatistics({ filters, subActiveTab, entityCode, toggleData });

	useEffect(() => {
		if (filters.date) {
			setDisabledConfig({
				date  : false,
				month : true,
				year  : true,
			});
		} else if (filters.month) {
			setDisabledConfig({
				date  : true,
				month : false,
				year  : false,
			});
		} else if (filters.year) {
			setDisabledConfig({
				date  : true,
				month : true,
				year  : false,
			});
		} else {
			setDisabledConfig({
				date  : false,
				month : false,
				year  : false,
			});
		}
	}, [filters.date, filters.month, filters.year]);

	useEffect(() => {
		if ((filters.month || filters.year)) {
			setFilters((p) => ({ ...p, date: undefined }));
		}
		if ((!filters.date && toggleData)) {
			setFilters((p) => ({ ...p, date: new Date() }));
		}
	}, [toggleData]);

	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<div>
					<div className={styles.journey}>
						{t('sales_statistics')}
						<Tooltip content={t('daily_sales_stats')} placement="top">
							<div className={styles.icon}><IcMInfo height="18px" width="18px" /></div>
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
						offLabel={t('line_graph_view')}
						disabled={false}
					/>
					<Filter
						filters={filters}
						setFilters={setFilters}
						controls={filterControls(toggleData, disabledConfig, filters, t)}
					/>
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
					entityCode={entityCode}
				/>
			</div>
		</div>
	);
}
export default DailySales;
