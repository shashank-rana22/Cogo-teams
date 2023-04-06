import { Tooltip, Toggle } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useEffect, useState } from 'react';

import Filter from '../../../../commons/Filters';
import useInvoiceStatistics from '../../../hooks/useinvoiceStatistics';
import { filterControls } from '../../../Utils/filterControls';

import styles from './styles.module.css';
import TabData from './TabData';

interface ObjectProps {
	date?: Date,
	month?: string,
	year?: string
}
interface DailySalesProps {
	filterValue?: object
	entityCode?: string
}

function DailySales({ filterValue, entityCode }: DailySalesProps) {
	const [filters, setFilters] = useState<ObjectProps>({});
	const [subActiveTab, setSubActiveTab] = useState<string>('SALES_INVOICE');
	const [toggleData, setToggleData] = useState(false);
	const [disabledConfig, setDisabledConfig] = useState({
		date  : false,
		month : false,
		year  : false,
	});
	const { dailyStatsData, loading } = useInvoiceStatistics({ filters, subActiveTab, entityCode });

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
				year  : true,
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

	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<div>
					<div className={styles.journey}>
						Daily Sales Statistics
						<Tooltip content="Daily Sales Statistics." placement="top">
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
						offLabel="Line Graph View"
						disabled={false}
					/>
					<Filter
						filters={filters}
						setFilters={setFilters}
						controls={filterControls(toggleData, disabledConfig, filters)}
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
