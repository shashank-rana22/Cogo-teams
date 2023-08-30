import { Loader } from '@cogoport/components';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import DotLoader from '../../../../../../common/LoadingState/DotLoader';
import AppliedFilters from '../../../../common/AppliedFilters';
import RequestRate from '../../../../common/RequestRate';
import Schedules from '../../../../common/Schedules';

import ComparisonHeader from './components/ComparisonHeader';
import EmptyState from './components/EmptyState';
import Header from './components/Header';
import RateCard from './components/RateCard';
import styles from './styles.module.css';

function ListRates({
	rates = [],
	detail = {},
	filters = {},
	setFilters = () => {},
	refetch = () => {},
	loading = false,
	comparisonRates = {},
	setScreen = () => {},
	setComparisonRates = () => {},
	setPage = () => {},
	selectedWeek = {},
	setSelectedWeek = () => {},
	paginationProps = {},
}) {
	const [showFilterModal, setShowFilterModal] = useState(false);
	const [openAccordian, setOpenAccordian] = useState('');

	const showComparison = !isEmpty(comparisonRates);

	const { total_count, page_limit, page } = paginationProps;

	if (!loading && isEmpty(rates)) {
		return (
			<EmptyState
				details={detail}
				filters={filters}
				setFilters={setFilters}
				refetch={refetch}
				showFilterModal={showFilterModal}
				setShowFilterModal={setShowFilterModal}
				setOpenAccordian={setOpenAccordian}
				openAccordian={openAccordian}
			/>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.header_wrapper}>
				<div className={styles.header}>
					<Header
						details={detail}
						filters={filters}
						setFilters={setFilters}
						total_rates_count={detail?.rates_count}
						refetch={refetch}
						loading={loading}
						showFilterModal={showFilterModal}
						setShowFilterModal={setShowFilterModal}
						openAccordian={openAccordian}
						setOpenAccordian={setOpenAccordian}
					/>

					{showComparison ? (
						<ComparisonHeader
							comparisonRates={comparisonRates}
							setComparisonRates={setComparisonRates}
							setScreen={setScreen}
						/>
					) : null}
				</div>
			</div>

			<Schedules
				paginationProps={paginationProps}
				filters={filters}
				setFilters={setFilters}
				setPage={setPage}
				setComparisonRates={setComparisonRates}
				setSelectedWeek={setSelectedWeek}
				selectedWeek={selectedWeek}
				loading={loading}
			/>

			<AppliedFilters
				setShowFilterModal={setShowFilterModal}
				setOpenAccordian={setOpenAccordian}
				filters={filters}
				setFilters={setFilters}
			/>

			{loading ? (
				<div className={styles.loading}>
					<span className={styles.loading_text}>Looking for Rates</span>
					<Loader themeType="primary" className={styles.loader} background="#000" />
				</div>
			) : null}

			{(rates || []).map((rateItem) => (
				<RateCard
					key={rateItem.id}
					loading={loading}
					rate={rateItem}
					detail={detail}
					setComparisonRates={setComparisonRates}
					comparisonRates={comparisonRates}
						// infoBanner={infoBanner}
						// setInfoBanner={setInfoBanner}
						// showGuide={isEmpty(cogoAssuredRates) && !index && !isGuideViewed}
				/>
			))}

			{!loading && page < Math.ceil(total_count / page_limit) ? (
				<div className={styles.show_more_button}>
					<div
						role="presentation"
						onClick={() => refetch({ show_more: true })}
						className={styles.button}
					>
						Show more results
						{' '}
						<IcMArrowRotateDown style={{ marginLeft: '8px' }} />
					</div>
				</div>
			) : null}

			{loading && (
				<div className={styles.spinner_container}>
					<DotLoader size="lg" />
					<div className={styles.text}>Fetching rates, please wait</div>
				</div>
			)}

			{loading ? null : <RequestRate details={detail} className={styles.request_rate} />}
		</div>
	);
}

export default ListRates;
