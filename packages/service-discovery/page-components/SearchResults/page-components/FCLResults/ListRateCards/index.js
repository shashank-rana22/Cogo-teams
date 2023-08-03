import { Loader, Pagination, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

// import useScrollDirection from '../../../../../common/Header/useScrollDirection';
import RequestRate from '../../../common/EmptyState/RequestRate';
import CogoAssuredCard from '../CogoAssuredCard';
import FclCard from '../FclCard';

import ComparisonHeader from './ComparisonHeader';
import ContractAd from './ContractAd';
import Header from './Header';
import Schedules from './Schedules';
import styles from './styles.module.css';

const MAXIMUM_RATE_CARDS = 5;

const ONE = 1;

function HeaderTop({
	detail = {},
	filters = {},
	setFilters = () => {},
	total_rates_count = 0,
	comparisonRates = {},
	setComparisonRates = () => {},
	setScreen = () => {},
	refetch = () => {},
}) {
	// const { scrollDirection } = useScrollDirection();
	const showComparison = !isEmpty(comparisonRates);

	return (
		<div className={styles.header}>
			<Header
				details={detail}
				filters={filters}
				setFilters={setFilters}
				total_rates_count={total_rates_count}
				refetch={refetch}
			/>

			{showComparison ? (
				<ComparisonHeader
					comparisonRates={comparisonRates}
					setComparisonRates={setComparisonRates}
					setScreen={setScreen}
				/>
			) : null}
		</div>
	);
}

function LoaderComponent() {
	return (
		<div className={styles.loading}>
			<span className={styles.loading_text}>Looking for Rates</span>
			<Loader themeType="primary" className={styles.loader} background="#000" />
		</div>
	);
}

function RateCard({
	rateCardData = {},
	loading = false,
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
	if (loading) {
		return null;
	}

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
	rates = [], detail = {},
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
}) {
	const PrimaryService = detail?.search_type;

	if (PrimaryService === undefined) {
		return null;
	}

	const { current = '' } = infoBanner;

	const show_dim_bg = current === 'comparision_button' && rates.length > ONE;

	const { cogoAssuredRates, marketplaceRates } = rates.reduce((acc, rate) => {
		if (rate.source === 'cogo_assured_rate') {
			return { ...acc, cogoAssuredRates: [...acc.cogoAssuredRates, rate] };
		}

		return { ...acc, marketplaceRates: [...acc.marketplaceRates, rate] };
	}, { cogoAssuredRates: [], marketplaceRates: [] });

	return (
		<div className={cl`${styles.container} ${show_dim_bg && styles.dim_bg}`}>
			<div className={styles.header_wrapper}>
				<HeaderTop
					detail={detail}
					filters={filters}
					setFilters={setFilters}
					total_rates_count={detail?.rates_count}
					comparisonRates={comparisonRates}
					setComparisonRates={setComparisonRates}
					setScreen={setScreen}
					refetch={refetchSearch}
					cogoAssuredRates={cogoAssuredRates}
				/>
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

			{loading || isEmpty(cogoAssuredRates) ? null : (
				<CogoAssuredCard
					rates={cogoAssuredRates}
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

			{loading ? <LoaderComponent /> : null}

			{(marketplaceRates || []).map((rateCardData, index) => (
				<>
					<RateCard
						key={rateCardData.id}
						loading={loading}
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

			{loading ? null : <RequestRate details={detail} className={styles.request_rate} />}

			{rates.length > MAXIMUM_RATE_CARDS && !loading ? (
				<div className={styles.pagination}>
					<Pagination
						type="table"
						currentPage={filters.page}
						totalItems={paginationProps?.total_count}
						pageSize={paginationProps?.page_limit}
						onPageChange={(val) => setFilters((prev) => ({
							...prev,
							page: val,
						}))}
					/>
				</div>
			) : null}
		</div>
	);
}

export default ListRateCards;
