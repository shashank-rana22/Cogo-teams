import { Loader, Pagination, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import AppliedFilters from '../../../common/AppliedFilters';
import RequestRate from '../../../common/RequestRate';
import CogoAssuredCard from '../CogoAssuredCard';
import FclCard from '../FclCard';

import ComparisonHeader from './ComparisonHeader';
import ContractAd from './ContractAd';
import EmptyState from './EmptyState';
import Header from './Header';
import Schedules from './Schedules';
import styles from './styles.module.css';

const MAXIMUM_RATE_CARDS = 5;

const ONE = 1;

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
	setPage = () => {},
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
}) {
	const [showFilterModal, setShowFilterModal] = useState(false);
	const [openAccordian, setOpenAccordian] = useState('');

	const primary_service = detail?.search_type;

	const { current = '' } = infoBanner;

	const show_dim_bg = current === 'comparision_button' && rates.length > ONE;

	const showComparison = !isEmpty(comparisonRates);

	if (!primary_service) { return null; }

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

			{loading || isEmpty(cogoAssuredRates) ? null : (
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

			{(rates || []).length > MAXIMUM_RATE_CARDS && !loading ? (
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

export default ListRateCards;
