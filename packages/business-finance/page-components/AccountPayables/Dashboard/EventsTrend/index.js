import { Toggle, Placeholder, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Filter from '../../../commons/Filters';
import SegmentedControl from '../../../commons/SegmentedControl';
import { CHART_OPTIONS } from '../Constants';
import useGetEventsTrend from '../hooks/useGetEventsTrend';

import { filterControls } from './filterControl';
import LineCharts from './LineCharts';
import styles from './styles.module.css';

interface FilterProps {
	service?: string,
	currency?: string,
}
interface ItemProps {
	showData: string;
	setShowData: Function;
	filtersData: FilterProps;
	activeEntity: string;
}

function EventsTrend({ showData, setShowData, filtersData, activeEntity }:ItemProps) {
	const [isCountView, setIsCountView] = useState(false);
	const {
		data,
		loading,
		filters,
		setFilters,
	} = useGetEventsTrend({ showData, filtersData, activeEntity });

	const { list, currency } = data || {};

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
						content={(
							<div>
								Select an event to see the
								<br />
								occurrence of that event on Purchase Invoices in a given
								interval of time.
							</div>
						)}
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
							value={isCountView as unknown as string}
							onChange={() => setIsCountView(!isCountView)}
							disabled={false}
						/>
					</div>
				</div>
				<div className={styles.filter}>
					<div className={styles.segmented_filter}>
						<SegmentedControl
							options={CHART_OPTIONS}
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
				</div>
			)
				: <LineCharts data={list} isCountView={isCountView} showData={showData} currency={currency} />}
		</div>
	);
}

export default EventsTrend;
