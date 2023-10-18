import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import DotLoader from '../../../../../../common/LoadingState/DotLoader';
import ContractAd from '../../../../common/ContractAd';
import RequestRate from '../../../../common/RequestRate';

import AppliedFilters from './components/AppliedFilters';
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
	paginationProps = {},
	contract_detail = {},
	setRouterLoading = () => {},
}) {
	const [showFilterModal, setShowFilterModal] = useState(false);
	const [openAccordian, setOpenAccordian] = useState('');

	const { total_count, page_limit, page } = paginationProps;

	const transitTime = (rates || []).reduce((acc, rate) => {
		if (!acc.min || rate.transit_time < acc.min) {
			acc.min = rate.transit_time;
		}

		if (!acc.max || rate.transit_time > acc.max) {
			acc.max = rate.transit_time;
		}

		return acc;
	}, { min: null, max: null });

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
						setRouterLoading={setRouterLoading}
						transitTime={transitTime}
					/>
				</div>
			</div>

			<AppliedFilters
				setShowFilterModal={setShowFilterModal}
				setOpenAccordian={setOpenAccordian}
				filters={filters}
				setFilters={setFilters}
			/>

			<ContractAd
				loading={loading}
				importerExporterId={detail.importer_exporter_id}
				contractDetail={contract_detail}
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

			{loading ? null : (
				<div className={styles.request_rate}>
					<RequestRate details={detail} />
				</div>
			)}
		</div>
	);
}

export default ListRates;
