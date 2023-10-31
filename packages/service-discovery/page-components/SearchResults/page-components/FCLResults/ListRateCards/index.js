import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import DotLoader from '../../../../../common/LoadingState/DotLoader';
import AppliedFilters from '../../../common/AppliedFilters';
import ComparisonHeader from '../../../common/Comparison/ComparisonHeader';
import ContractAd from '../../../common/ContractAd';
import EmptyState from '../../../common/EmptyState';
import RequestRate from '../../../common/RequestRate';
import Schedules from '../../../common/Schedules';
import CogoAssuredCard from '../CogoAssuredCard';
import FclCard from '../FclCard';

import Header from './Header';
import styles from './styles.module.css';

const ONE = 1;

function RateCard({
	rateCardData = {},
	detail = {},
	setScreen = () => {},
	setComparisonRates = () => {},
	comparisonRates = {},
	refetchSearch = () => {},
	infoBanner = {},
	index = 0,
	setInfoBanner = () => {},
	showGuide = false,
	cogoAssuredRates = [],
	setRouterLoading = () => {},
	isMobile = false,
}) {
	return (
		<FclCard
			key={rateCardData.id}
			rateCardData={rateCardData}
			detail={detail}
			setScreen={setScreen}
			setComparisonRates={setComparisonRates}
			comparisonRates={comparisonRates}
			refetchSearch={refetchSearch}
			infoBanner={infoBanner}
			index={index}
			setInfoBanner={setInfoBanner}
			showGuide={showGuide}
			cogoAssuredRates={cogoAssuredRates}
			setRouterLoading={setRouterLoading}
			isMobile={isMobile}
		/>
	);
}

function ListRateCards({
	rates = [],
	detail = {},
	contract_detail = {},
	setSelectedCard = () => {},
	setScreen = () => {},
	setComparisonRates = () => {},
	comparisonRates = {},
	filters = {},
	setFilters = () => {},
	refetchSearch = () => {},
	paginationProps = {},
	loading = false,
	infoBanner = {},
	setInfoBanner = () => {},
	isGuideViewed = false,
	cogoAssuredRates = [],
	marketplaceRates = [],
	setRouterLoading = () => {},
	setScheduleLoading = () => {},
	scheduleLoading = false,
	setSelectedSchedule = () => {},
	selectedSchedule = () => {},
	isMobile = false,
}) {
	const [showFilterModal, setShowFilterModal] = useState(false);
	const [openAccordian, setOpenAccordian] = useState('');

	const primary_service = detail?.search_type;

	const { current = '' } = infoBanner;

	const show_dim_bg = current === 'comparision_button' && rates.length > ONE;

	const showComparison = !isEmpty(comparisonRates);

	const { total_count, page_limit, page } = paginationProps;

	// const transitTime = (rates || []).reduce((acc, rate) => {  //COMMENTED FOR FUTURE USE
	// 	if (!acc.min || rate.transit_time < acc.min) {
	// 		acc.min = rate.transit_time;
	// 	}

	// 	if (!acc.max || rate.transit_time > acc.max) {
	// 		acc.max = rate.transit_time;
	// 	}

	// 	return acc;
	// }, { min: null, max: null });

	if (!primary_service) {
		return null;
	}

	if (!loading && isEmpty(rates)) {
		return (
			<EmptyState
				details={detail}
				filters={filters}
				setFilters={setFilters}
				refetch={refetchSearch}
				showFilterModal={showFilterModal}
				setShowFilterModal={setShowFilterModal}
				setOpenAccordian={setOpenAccordian}
				openAccordian={openAccordian}
				isMobile={isMobile}
				// transitTime={transitTime}
			/>
		);
	}

	return (
		<div className={cl`${styles.container} ${show_dim_bg && styles.dim_bg}`}>
			<div className={styles.header_wrapper}>
				<div className={styles.header}>
					<Header
						details={detail}
						filters={filters}
						setFilters={setFilters}
						total_rates_count={detail?.rates_count}
						refetch={refetchSearch}
						loading={loading}
						showFilterModal={showFilterModal}
						setShowFilterModal={setShowFilterModal}
						openAccordian={openAccordian}
						setOpenAccordian={setOpenAccordian}
						setScheduleLoading={setScheduleLoading}
						setRouterLoading={setRouterLoading}
						isMobile={isMobile}
						// transitTime={transitTime}
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
				service_type="fcl_freight"
			/>

			{isEmpty(cogoAssuredRates) ? null : (
				<CogoAssuredCard
					cogoAssuredRates={cogoAssuredRates}
					loading={loading}
					detail={detail}
					setSelectedCard={setSelectedCard}
					setScreen={setScreen}
					setComparisonRates={setComparisonRates}
					comparisonRates={comparisonRates}
					refetchSearch={refetchSearch}
					infoBanner={infoBanner}
					setInfoBanner={setInfoBanner}
					isGuideViewed={isGuideViewed}
					setRouterLoading={setRouterLoading}
					isMobile={isMobile}
				/>
			)}

			{isEmpty(cogoAssuredRates) ? null : (
				<ContractAd
					loading={loading}
					importerExporterId={detail.importer_exporter_id}
					contractDetail={contract_detail}
					isMobile={isMobile}
					style={{ marginBottom: 40 }}
				/>
			)}

			{(marketplaceRates || []).map((rateCardData, index) => (
				<>
					<RateCard
						key={rateCardData.id}
						rateCardData={rateCardData}
						detail={detail}
						setSelectedCard={setSelectedCard}
						setScreen={setScreen}
						setComparisonRates={setComparisonRates}
						comparisonRates={comparisonRates}
						refetchSearch={refetchSearch}
						infoBanner={infoBanner}
						index={index}
						setInfoBanner={setInfoBanner}
						showGuide={isEmpty(cogoAssuredRates) && !index && !isGuideViewed}
						cogoAssuredRates={cogoAssuredRates}
						setRouterLoading={setRouterLoading}
						isMobile={isMobile}
					/>
					{index === GLOBAL_CONSTANTS.zeroth_index && isEmpty(cogoAssuredRates) ? (
						<ContractAd
							loading={loading}
							importerExporterId={detail.importer_exporter_id}
							contractDetail={contract_detail}
							isMobile={isMobile}
							style={{ marginTop: 40 }}
						/>
					) : null}
				</>
			))}

			{!loading && page < Math.ceil(total_count / page_limit) ? (
				<div className={styles.show_more_button}>
					<div
						role="presentation"
						onClick={() => refetchSearch({ show_more: true })}
						className={styles.button}
					>
						Show more results
						{' '}
						<IcMArrowRotateDown style={{ marginLeft: '8px' }} />
					</div>
				</div>
			) : null}

			{loading && !scheduleLoading && (
				<div className={styles.spinner_container}>
					<DotLoader size="lg" />
					<div className={styles.text}>Fetching rates, please wait</div>
				</div>
			)}

			{loading ? null : (
				<div className={styles.request_rate}>
					<RequestRate
						details={detail}
						rates={rates}
						isMobile={isMobile}
					/>
				</div>
			)}
		</div>
	);
}

export default ListRateCards;
