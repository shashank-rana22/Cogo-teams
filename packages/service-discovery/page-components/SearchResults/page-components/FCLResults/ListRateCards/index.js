import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { Router } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import DotLoader from '../../../../../common/LoadingState/DotLoader';
import AdditionalTabs from '../../../common/AdditionalTabs';
import EmptyState from '../../../common/EmptyState';
import CogoAssuredCard from '../CogoAssuredCard';
import FclCard from '../FclCard';

import AppliedFilters from './AppliedFilters';
import ComparisonHeader from './ComparisonHeader';
import ContractAd from './ContractAd';
import Header from './Header';
import Schedules from './Schedules';
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
	selectedWeek = {},
	setSelectedWeek = () => {},
	paginationProps = {},
	loading = false,
	infoBanner = {},
	setInfoBanner = () => {},
	isGuideViewed = false,
	cogoAssuredRates = [],
	marketplaceRates = [],
	routerLoading = false,
	setRouterLoading = () => {},
}) {
	const [showFilterModal, setShowFilterModal] = useState(false);
	const [openAccordian, setOpenAccordian] = useState('');

	const primary_service = detail?.search_type;

	const { current = '' } = infoBanner;

	const show_dim_bg = current === 'comparision_button' && rates.length > ONE;

	const showComparison = !isEmpty(comparisonRates);

	const { total_count, page_limit, page } = paginationProps;

	useEffect(() => {
		Router.events.on('routeChangeComplete', () => {
			setRouterLoading(false);
		});
	}, [setRouterLoading]);

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
				setScreen={setScreen}
				rates={rates}
			/>
		);
	}

	if (routerLoading) {
		return (
			<div className={styles.loading}>
				<span className={styles.loading_text}>Loading Rates</span>
				<DotLoader />
			</div>
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
						setRouterLoading={setRouterLoading}
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
				/>
			)}

			{isEmpty(cogoAssuredRates) ? null : (
				<ContractAd
					loading={loading}
					importerExporterId={detail.importer_exporter_id}
					contractDetail={contract_detail}
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
						routerLoading={routerLoading}
					/>
					{index === GLOBAL_CONSTANTS.zeroth_index && isEmpty(cogoAssuredRates) ? (
						<ContractAd
							loading={loading}
							importerExporterId={detail.importer_exporter_id}
							contractDetail={contract_detail}
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

			{loading && (
				<div className={styles.spinner_container}>
					<DotLoader size="lg" />
					<div className={styles.text}>Fetching rates, please wait</div>
				</div>
			)}

			<AdditionalTabs
				detail={detail}
				rates={rates}
				loading={loading}
				setScreen={setScreen}
			/>
		</div>
	);
}

export default ListRateCards;
