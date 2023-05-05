import { Pagination } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../common/Empty';
import Loader from '../../../common/PopoverLoader';
import useGetMonthlyRevenue from '../../../hooks/useGetMonthlyRevenue';
import useGetTypewiseBreakdown from '../../../hooks/useGetTypewiseBreakdown';

import BarChart from './BarChart';
import PieChart from './PieChart';
import PieLegends from './PieLegends';
import styles from './styles.module.css';

function VisualizationContainer({
	buckets,
	setSelectedBarData,
	isDataSelected,
	selectedData,
	setSelectedPieData,
	setPage,
	inViewport,
	byEtd,
	headerFilters,
}) {
	const {
		data = [],
		loading,
		error,
		filters,
		setFilters,
	} = useGetMonthlyRevenue({
		apiKey: buckets.heading,
		isDataSelected,
		inViewport,
		byEtd,
		headerFilters,
	});

	const {
		data: breakdownData = [],
		loading: breakdownLoading,
		breakdownError,
	} = useGetTypewiseBreakdown({
		apiKey: buckets.key,
		isDataSelected,
		selectedData,
		byEtd,
		headerFilters,
	});

	const isDataAvailable = error === null && data.length > 0;

	const handlePagination = (page) => {
		setFilters({ ...filters, page });
		setSelectedBarData();
		setSelectedPieData();
	};

	const renderChartData = () => {
		if (loading || breakdownLoading) {
			return <Loader />;
		}

		if (!isDataSelected) {
			return (
				<div className={styles.container}>
					{isDataAvailable ? (
						<div className={styles.chart_container}>
							<BarChart
								data={data || []}
								buckets={buckets}
								setSelectedBarData={setSelectedBarData}
								setSelectedPieData={setSelectedPieData}
							/>
						</div>
					) : (
						<EmptyState />
					)}
				</div>
			);
		}

		return (
			<div className={styles.container}>
				{breakdownError === null && breakdownData.length > 0 ? (
					<>
						<div className={styles.chart_container}>
							<PieChart
								data={breakdownData || []}
								setSelectedPieData={setSelectedPieData}
								selectedBarData={selectedData}
								apiKey={buckets.key}
								setPage={setPage}
							/>
						</div>
						<div className={styles.pie_data}>
							<PieLegends data={breakdownData || []} />
						</div>

					</>
				) : (
					<EmptyState />
				)}
			</div>
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				{startCase(buckets.heading)}
				{' '}
				<span className={styles.data_id}>
					{selectedData
						&& `(${startCase(selectedData.type)} > ${startCase(
							selectedData.id,
						)}) (${selectedData.indexValue})`}
				</span>
			</div>
			{renderChartData()}
			<div className={styles.pagination}>
				<div>
					{filters.page !== 1 && (
						<div
							style={{
								cursor : loading ? 'not-allowed' : 'pointer',
								color  : 'red',
							}}
							onClick={loading ? () => {} : () => handlePagination(1)}
							role="button"
							tabIndex="0"
						>
							Go to page 1
						</div>
					)}
				</div>
				<div>
					{!isDataSelected && (
						<div className={styles.pagination_container}>
							<Pagination
								type="page"
								className={styles.pagination}
								currentPage={filters.page}
								totalItems={1000}
								pageSize={4}
								onPageChange={handlePagination}
							/>
						</div>
					)}
				</div>
			</div>

		</div>
	);
}

export default VisualizationContainer;
