import { Tabs, TabPanel, Loader, cl } from '@cogoport/components';
import {
	IcMArrowLeft,
	IcMArrowRight,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useRef, useEffect, useMemo } from 'react';

import useGetOutstandingInvoices from '../../../../hooks/useGetOutstandingInvoices';
import EmptyStateOutStanding from '../../EmptyStateOutStanding';

import BarChart from './BarChart';
import Headers from './Header';
import KamWiseData from './KamWiseData';
import LineChart from './LineChart';
import styles from './styles.module.css';

const PAGE_NUMBER = 1;
const DATA_LENGTH = 6;
const PAGE_SIZE = 2;
const CHECK_DATA_LENGTH = 0;

function VisualizationData({
	openVisualization = false,
}) {
	const [selectedBarData, setSelectedBarData] = useState();
	const [kamOwnerId, setKamOwnerId] = useState([]);
	const [toggleValue, setToggleValue] = useState(false);

	const kamDataStart = useRef(null);

	const [filterValues, setFilterValues] = useState({
		period_type      : 'week',
		bifurcation_type : 'overall',
		view_type        : 'outstanding',
	});

	const scrollToKam = () => {
		kamDataStart.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		if (selectedBarData) scrollToKam();
	}, [selectedBarData]);

	const { data, loading, filters, setFilters } = useGetOutstandingInvoices(
		filterValues,
		kamOwnerId,
		toggleValue,
	);
	const { page_number } = filters || {};

	const reversedData = useMemo(() => (data || []).reverse(), [data]);

	const renderOnClick = () => setFilters({ ...filters, page_number: page_number + PAGE_NUMBER });

	const handlePagination = () => {
		if (page_number > PAGE_NUMBER) {
			setFilters({ ...filters, page_number: page_number - PAGE_NUMBER });
		}
	};
	function RenderBarChart() {
		if (loading) {
			return (
				<div className={styles.container}>
					<Loader themeType="primary" style={{ height: 64, width: 64 }} />
				</div>
			);
		}

		if (!loading && isEmpty(data || [])) {
			return (
				<div className={styles.container}>
					<EmptyStateOutStanding width={400} height={200} />
				</div>
			);
		}

		return !toggleValue ? (
			<BarChart
				data={reversedData}
				filterValues={filterValues}
				setSelectedBarData={setSelectedBarData}
			/>
		) : (
			<LineChart data={data} />
		);
	}

	const handleTabs = (e) => {
		setFilterValues((prev) => ({
			...prev,
			view_type        : e,
			bifurcation_type : 'overall',
		}));
	};
	const disabled = isEmpty(data) || (data || []).length < DATA_LENGTH;
	return (
		<div className={styles.visualization_container}>
			{openVisualization && (
				<>
					<Headers
						filterValues={filterValues}
						setFilterValues={setFilterValues}
						setSelectedBarData={setSelectedBarData}
						setKamOwnerId={setKamOwnerId}
						setToggleValue={setToggleValue}
						toggleValue={toggleValue}
						loading={loading}
						setFilters={setFilters}
					/>
					<div className={styles.chart_container}>
						<div
							className={cl`${disabled ? styles.arrow_container_disabled : styles.arrow_container} `}
						>
							<IcMArrowLeft
								disabled
								width={40}
								height={40}
								onClick={renderOnClick}
							/>
						</div>
						<RenderBarChart />
						<div
							className={cl`${disabled ? styles.arrow_container_disabled : styles.arrow_container} `}
							disabled={page_number < PAGE_SIZE}
						>
							<IcMArrowRight
								onClick={handlePagination}
								width={40}
								height={40}
							/>
						</div>
					</div>
					{!toggleValue && (
						<div className={styles.tab_container}>
							<Tabs
								activeTab={filterValues.view_type}
								themeType="primary"
								onChange={(e) => handleTabs(e)}
								className={styles.custom_tabs}
							>
								<TabPanel name="outstanding" title="Outstanding" />
								<TabPanel name="invoice" title="Invoice" />
								<TabPanel name="payment" title="Payment" />
							</Tabs>
						</div>
					)}
					{!toggleValue
						&& filterValues.view_type === 'outstanding'
						&& selectedBarData?.id !== 'on_account_amount' && (
							<>
								<div className={styles.divider} ref={kamDataStart} />
								{data?.length > CHECK_DATA_LENGTH && (
									<KamWiseData
										selectedBarData={selectedBarData}
										filterValues={filterValues}
										barData={data}
										setKamOwnerId={setKamOwnerId}
										pageNumber={page_number}
									/>
								)}
							</>
					)}
				</>
			)}
		</div>
	);
}

export default VisualizationData;
