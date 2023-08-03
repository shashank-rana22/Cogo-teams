import { useState } from 'react';

import useGetSopList from '../../hooks/useGetSopList';
import getTradePartnersDetails from '../../hooks/useGetTradePartnersDetails';

import SopCard from './Card';
import EmptyState from './EmptyState';
import Header from './Header';
import SopLoader from './SopLoader';
import styles from './styles.module.css';

function Sop({ shipment_data = {}, primary_service = {} }) {
	const [filters, setFilters] = useState([]);
	const [reload, setReload] = useState(false);

	const { trade_partners_loading, trade_partners_details, tradePartnerData } = getTradePartnersDetails({
		shipment_id: shipment_data?.id || '',
	});

	const { sopData, loading } = useGetSopList({
		filters,
		trade_partners_details,
		tradePartnerData,
		shipment_data,
		primary_service,
	});

	const sops = !trade_partners_loading ? sopData?.list || [] : [];

	let content = (
		<>
			<div className={styles.count_sop}>
				{sops?.length}
				{' '}
				SOP’s
			</div>

			{sops?.map((sop) => (
				<SopCard
					key={sop?.id}
					details={sop}
					reload={reload}
					setReload={setReload}
					trade_partners_details={trade_partners_details}
					primary_service={primary_service}
				/>
			))}
		</>
	);

	if (loading || trade_partners_loading) {
		content = (
			<>
				{/* <SkeletonV1 style={{ marginBottom: '12px' }} /> */}
				<SopLoader />
			</>
		);
	}

	if (!loading && !trade_partners_loading && sops.length === 0) {
		content = (
			<div className={styles.empty_state}>
				<EmptyState
					height={220}
					width={380}
					flexDirection="column"
					textSize="20px"
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{!trade_partners_loading ? (
				<Header
					shipment_data={shipment_data}
					primary_service={primary_service}
					trade_partners_details={trade_partners_details}
					filters={filters}
					setFilters={setFilters}
					reload={reload}
					setReload={setReload}
				/>
			) : null}

			<div className={styles.sop_list}>{content}</div>
		</div>
	);
}
export default Sop;
