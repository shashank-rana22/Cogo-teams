import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import DotLoader from '../../../../../../common/LoadingState/DotLoader';
import useInfiniteScroll from '../../../../../../hooks/useInfiniteScroll';
import AppliedFilters from '../../../../common/AppliedFilters';
import ContractAd from '../../../../common/ContractAd';
import EmptyState from '../../../../common/EmptyState';
import RequestRate from '../../../../common/RequestRate';

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
	paginationProps = {},
	contract_detail = {},
	setRouterLoading = () => {},
	isMobile = false,
}) {
	const [showFilterModal, setShowFilterModal] = useState(false);
	const [openAccordian, setOpenAccordian] = useState('');

	const { total_count, page_limit, page } = paginationProps;

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
						isMobile={isMobile}
					/>
				</div>
			</div>

			<AppliedFilters
				setShowFilterModal={setShowFilterModal}
				setOpenAccordian={setOpenAccordian}
				filters={filters}
				setFilters={setFilters}
				service_type="ftl_freight"
			/>

			<ContractAd
				loading={loading}
				importerExporterId={detail.importer_exporter_id}
				contractDetail={contract_detail}
				isMobile={isMobile}
				style={{ marginBottom: 40 }}
			/>

			{(rates || []).map((rateItem, index) => (
				<RateCard
					key={rateItem.id}
					loading={loading}
					rate={rateItem}
					detail={detail}
					index={index}
					setRouterLoading={setRouterLoading}
					isMobile={isMobile}
				/>
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
