import { Loader, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import AppliedFilters from '../../../../common/AppliedFilters';
import RequestRate from '../../../../common/RequestRate';

// import CogoAssuredCard from './components/CogoAssuredCard';
import ComparisonHeader from './components/ComparisonHeader';
import EmptyState from './components/EmptyState';
import Header from './components/Header';
import RateCard from './components/RateCard';
// import Schedules from './components/Schedules';
import styles from './styles.module.css';

const MINIMUM_RATE_CARDS_FOR_PAGINATION = 5;

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
	// selectedWeek = {},
	// setSelectedWeek = () => {},
	paginationProps = {},
}) {
	const [showFilterModal, setShowFilterModal] = useState(false);
	const [openAccordian, setOpenAccordian] = useState('');

	const { cogoAssuredRates, marketplaceRates } = (rates || []).reduce((acc, rate) => {
		if (rate.source === 'cogo_assured_rate') {
			return { ...acc, cogoAssuredRates: [...acc.cogoAssuredRates, rate] };
		}

		return { ...acc, marketplaceRates: [...acc.marketplaceRates, rate] };
	}, { cogoAssuredRates: [], marketplaceRates: [] });

	const showComparison = !isEmpty(comparisonRates);

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

			{/* <Schedules
				paginationProps={paginationProps}
				filters={filters}
				setFilters={setFilters}
				setPage={setPage}
				setComparisonRates={setComparisonRates}
				setSelectedWeek={setSelectedWeek}
				selectedWeek={selectedWeek}
				loading={loading}
			/> */}

			<AppliedFilters
				setShowFilterModal={setShowFilterModal}
				setOpenAccordian={setOpenAccordian}
				filters={filters}
				setFilters={setFilters}
			/>

			{/* {loading ? null : (
				<CogoAssuredCard
					cogoAssuredRates={marketplaceRates}
					detail={detail}
					setScreen={setScreen}
					setComparisonRates={setComparisonRates}
					comparisonRates={comparisonRates}
					refetch={refetch}
					// infoBanner={infoBanner}
					// setInfoBanner={setInfoBanner}
					// isGuideViewed={isGuideViewed}
				/>
			)} */}

			{loading ? (
				<div className={styles.loading}>
					<span className={styles.loading_text}>Looking for Rates</span>
					<Loader themeType="primary" className={styles.loader} background="#000" />
				</div>
			) : null}

			{(marketplaceRates || []).map((rateItem) => (
				<RateCard
					key={rateItem.id}
					loading={loading}
					rate={rateItem}
					detail={detail}
					cogoAssuredRates={cogoAssuredRates}
					setComparisonRates={setComparisonRates}
					comparisonRates={comparisonRates}
						// infoBanner={infoBanner}
						// setInfoBanner={setInfoBanner}
						// showGuide={isEmpty(cogoAssuredRates) && !index && !isGuideViewed}
				/>
			))}

			{loading ? null : <RequestRate details={detail} className={styles.request_rate} />}

			{(rates || []).length > MINIMUM_RATE_CARDS_FOR_PAGINATION && !loading ? (
				<Pagination
					type="table"
					currentPage={paginationProps?.page}
					totalItems={paginationProps?.total_count}
					pageSize={paginationProps?.page_limit}
					onPageChange={(val) => setPage(val)}
					className={styles.pagination}
				/>
			) : null}
		</div>
	);
}

export default ListRates;
