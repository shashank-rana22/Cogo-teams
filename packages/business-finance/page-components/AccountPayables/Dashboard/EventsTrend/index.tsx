import { Toggle, Placeholder, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Filter from '../../../commons/Filters';
import SegmentedControl from '../../../commons/SegmentedControl';
import useGetEventsTrend from '../hooks/useGetEventsTrend';

import { filterControls } from './filterControl';
import LineCharts from './LineCharts';
import styles from './styles.module.css';

const OPTIONS = [
	{
		label : 'Daily',
		value : 'day',
	},
	{
		label : 'Monthly',
		value : 'month',
	},
	{
		label : 'Last Three Month',
		value : 'lastThreeMonths',
	},
];

interface FilterProps {
	service:string,
	currency:string,
}
interface ItemProps {
	showData:string;
	setShowData:Function;
	filtersData:FilterProps;
	activeTab:string;
}

function EventsTrend({ showData, setShowData, filtersData, activeTab }:ItemProps) {
	const [isCountView, setIsCountView] = useState(false);
	const {
		data,
		loading,
		filters,
		setFilters,
	} = useGetEventsTrend({ showData, filtersData, activeTab });

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading_text}>
					<div className={styles.text}>
						Events Trend
						<div className={styles.hr} />
					</div>
					<Tooltip
						placement="top"
						content="Select an event to see the
						occurrence of that event on Purchase Invoices in a given interval of time."
					>
						<div className={styles.info_icon}>
							<IcMInfo width="16px" height="16px" />
						</div>
					</Tooltip>
					<div className={styles.toggle}>
						<div className={styles.heading_text}>
							Count View
						</div>
						<Toggle
							name="count_view"
							size="md"
							showOnOff
							value={isCountView}
							onChange={() => setIsCountView(!isCountView)}
							disabled={false}
						/>
					</div>
				</div>
				<div className={styles.filter}>
					<div className={styles.segmented_filter}>
						<SegmentedControl
							options={OPTIONS}
							activeTab={showData}
							setActiveTab={setShowData}
							color="#ED3726"
							background="#FFFAEB"
						/>

					</div>
					<div>
						<Filter controls={filterControls} filters={filters} setFilters={setFilters} />
					</div>
				</div>
			</div>
			{loading ? (
				<div className={styles.loading}>
					{[1, 2, 3, 4, 5].map(() => (
						<div className={styles.loading}>
							<Placeholder />
						</div>
					))}
					{/* <div className={styles.loading}>
						<Placeholder />
					</div>
					<div className={styles.loading}>
						<Placeholder />
					</div>
					<div className={styles.loading}>
						<Placeholder />
					</div>
					<div className={styles.loading}>
						<Placeholder />
					</div> */}
				</div>
			)
				: <LineCharts data={data} isCountView={isCountView} showData={showData} />}
		</div>
	);
}

export default EventsTrend;
