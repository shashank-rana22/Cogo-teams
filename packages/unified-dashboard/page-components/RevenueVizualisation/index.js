import { Button, Select } from '@cogoport/components';
import React, { useState, useRef, useEffect } from 'react';

import {
	chartBuckets,
	pieBuckets,
	selectOptions,
} from '../../constants/chart-buckets';
import useGetPieBreakdown from '../../hooks/useGetPieBreakdown';
import useIntersection from '../../hooks/useIntersection';

import CohortTable from './Cohort';
import Funnel from './Funnel';
import styles from './styles.module.css';
import TableVisualization from './TableVisualization';
import VisualizationContainer from './VisualizationContainer';

function RevenueVisualization({ headerFilters }) {
	const [selectedBarData, setSelectedBarData] = useState();
	const [selectedPieData, setSelectedPieData] = useState();
	const [revenueFilter, setRevenueFilter] = useState('shipment_created_at');
	const [isComponentInViewport, setisComponentInViewport] = useState(false);
	const ref = useRef(null);
	const inViewportBarChart = useIntersection(ref, '-200px');
	const { entity_code } = headerFilters || {};

	const {
		data: apiData,
		loading,
		setPage,
		error,
	} = useGetPieBreakdown({ selectedPieData, revenueFilter, headerFilters });

	const isDataSelected = selectedBarData !== undefined;

	const handleResetCharts = () => {
		setSelectedBarData();
		setSelectedPieData();
		setRevenueFilter('shipment_created_at');
	};

	const handleDateType = (e) => {
		setRevenueFilter(e);
		setSelectedBarData();
		setSelectedPieData();
	};

	useEffect(() => {
		setSelectedBarData();
		setSelectedPieData();
		setRevenueFilter('shipment_created_at');
	}, [entity_code]);

	useEffect(() => {
		if (!isComponentInViewport) {
			setisComponentInViewport(inViewportBarChart);
		}
	}, [inViewportBarChart, isComponentInViewport]);

	return (
		<div className={styles.container} ref={ref}>
			<div className={styles.flex_header}>
				<div className={styles.flex_div}>
					<div className={styles.heading}>Revenue Visualization</div>
					<Select
						className={styles.dropdown}
						placeholder="By Shipment Date"
						isDataSelected={isDataSelected}
						value={revenueFilter}
						onChange={(e) => handleDateType(e)}
						options={selectOptions}
					/>
				</div>

				{selectedBarData && (
					<Button className={styles.reset_btn} onClick={handleResetCharts}>
						Reset
					</Button>
				)}
			</div>

			<div className={styles.flex_row}>
				<div className={styles.bar_container}>
					{chartBuckets.map((val) => (
						<div className={`${styles.flex_col} ${styles.border_right}`} key={val.heading}>
							<VisualizationContainer
								buckets={val}
								setSelectedBarData={setSelectedBarData}
								setSelectedPieData={setSelectedPieData}
								inViewport={isComponentInViewport}
								revenueFilter={revenueFilter}
								headerFilters={headerFilters}
							/>
						</div>
					))}
				</div>
				{selectedBarData && (
					<div className={styles.flex_col}>
						<div className={styles.divider} />
					</div>
				)}
				<div className={styles.pie_container}>
					{selectedBarData
					&& pieBuckets.map((val) => (
						<div className={`${styles.flex_col} ${styles.border_right}`} key={val.key}>
							<VisualizationContainer
								buckets={val}
								isDataSelected={isDataSelected}
								selectedData={selectedBarData}
								setSelectedPieData={setSelectedPieData}
								setPage={setPage}
								revenueFilter={revenueFilter}
								headerFilters={headerFilters}
							/>
						</div>
					))}
				</div>
			</div>
			{selectedPieData && (
				<>
					<div className={styles.divider} />
					<TableVisualization
						selectedPieData={selectedPieData}
						apiData={apiData}
						loading={loading}
						error={error}
						setPage={setPage}
					/>
				</>
			)}

			<div className={styles.divider} />

			<div className={styles.flex_row_2}>
				<div className={styles.flex_col_1}>
					<CohortTable
						isComponentInViewport={isComponentInViewport}
						revenueFilter={revenueFilter}
						headerFilters={headerFilters}
					/>
				</div>
				<div className={styles.divider_line} />
				<div className={styles.flex_col_2}>
					<Funnel revenueFilter={revenueFilter} headerFilters={headerFilters} />
				</div>
			</div>
		</div>
	);
}

export default RevenueVisualization;
