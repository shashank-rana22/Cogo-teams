import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useState, useMemo } from 'react';

import DotLoader from '../../../../../../common/LoadingState/DotLoader';
import useInfiniteScroll from '../../../../../../hooks/useInfiniteScroll';
import AppliedFilters from '../../../../common/AppliedFilters';
import ComparisonHeader from '../../../../common/Comparison/ComparisonHeader';
import ContractAd from '../../../../common/ContractAd';
import EmptyState from '../../../../common/EmptyState';
import RequestRate from '../../../../common/RequestRate';
import Schedules from '../../../../common/Schedules';

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
	paginationProps = {},
	contract_detail = {},
	infoBanner = {},
	setInfoBanner = () => {},
	isGuideViewed = false,
	setRouterLoading = () => {},
	setScheduleLoading = () => {},
	setSelectedSchedule = () => {},
	selectedSchedule = () => {},
	isMobile = false,
}) {
	const [showFilterModal, setShowFilterModal] = useState(false);
	const [openAccordian, setOpenAccordian] = useState('');

	const showComparison = !isEmpty(comparisonRates);

	const { total_count, page_limit, page } = paginationProps;

	const airlines = useMemo(() => {
		const uniqueAirlineIds = new Set((rates || []).map(({ airline_id = '' } = {}) => airline_id));
		return Array.from(uniqueAirlineIds);
	}, [rates]);

	const { isFetching } = useInfiniteScroll({
		hasMore       : page < Math.ceil(total_count / page_limit),
		refetchSearch : refetch,
	});

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
				airlines={airlines}
				isMobile={isMobile}
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
						setRouterLoading={setRouterLoading}
						airlines={airlines}
						setScheduleLoading={setScheduleLoading}
						isMobile={isMobile}
					/>

					{showComparison ? (
						<ComparisonHeader
							comparisonRates={comparisonRates}
							setComparisonRates={setComparisonRates}
							setScreen={setScreen}
							isMobile={isMobile}
						/>
					) : null}
				</div>
			</div>

			<Schedules
				paginationProps={paginationProps}
				filters={filters}
				setComparisonRates={setComparisonRates}
				loading={loading}
				setScheduleLoading={setScheduleLoading}
				setSelectedSchedule={setSelectedSchedule}
				selectedSchedule={selectedSchedule}
				isMobile={isMobile}
			/>

			<AppliedFilters
				setShowFilterModal={setShowFilterModal}
				setOpenAccordian={setOpenAccordian}
				filters={filters}
				setFilters={setFilters}
				service_type="air_freight"
			/>

			{(rates || []).map((rateItem, index) => (
				<div key={rateItem.id}>
					<RateCard
						key={rateItem.id}
						loading={loading}
						rate={rateItem}
						detail={detail}
						index={index}
						setComparisonRates={setComparisonRates}
						comparisonRates={comparisonRates}
						showGuide={!index && !isGuideViewed}
						infoBanner={infoBanner}
						setInfoBanner={setInfoBanner}
						setRouterLoading={setRouterLoading}
						isMobile={isMobile}
					/>

					{index === GLOBAL_CONSTANTS.zeroth_index ? (
						<ContractAd
							loading={loading}
							importerExporterId={detail.importer_exporter_id}
							contractDetail={contract_detail}
							isMobile={isMobile}
							style={{ marginTop: 40 }}
						/>
					) : null}
				</div>
			))}

			{isFetching && (
				<div className={styles.spinner_container}>
					<DotLoader size="lg" />
					<div className={styles.text}>Fetching rates, please wait</div>
				</div>
			)}

			{loading && !isFetching ? null : (
				<div className={styles.request_rate}>
					<RequestRate details={detail} isMobile={isMobile} />
				</div>
			)}
		</div>
	);
}

export default ListRates;
