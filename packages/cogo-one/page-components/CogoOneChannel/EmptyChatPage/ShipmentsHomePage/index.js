import { Pagination, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import useListShipments from '../../../../hooks/useListShipments';

import LoadingState from './LoadingState';
import ShipmentCard from './ShipmentCard';
import styles from './styles.module.css';

const DEFAULT_PAGE = 1;
const PAGE_LIMIT = 6;
const DEFAULT_SHIPMENTS_COUNT = 0;

function ShipmentsHomePage() {
	const [showPocDetails, setShowPocDetails] = useState({});

	const {
		listLoading,
		shipmentsData,
		setParams,
		params,
		handlePageChange = () => {},
	} = useListShipments();

	const {
		list = [],
		page = DEFAULT_PAGE,
		page_limit = PAGE_LIMIT,
		total_count = DEFAULT_SHIPMENTS_COUNT,
	} = shipmentsData || {};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.header_title}>
					Bookings
				</div>
				<div className={styles.filter_container}>
					<Input
						size="sm"
						value={params?.value}
						onChange={(val) => setParams((prev) => ({ ...prev, query: val }))}
						prefix={<IcMSearchlight className={styles.bishal_search_icon} />}
						placeholder="Search SID..."
					/>
				</div>
			</div>

			{listLoading
				? <LoadingState />
				: (
					<div className={styles.shipments_cards_container}>
						{(list || []).map(
							(shipmentItem) => (
								<ShipmentCard
									key={shipmentItem?.sid}
									shipmentItem={shipmentItem}
									showPocDetails={showPocDetails}
									setShowPocDetails={setShowPocDetails}
								/>
							),
						)}
					</div>
				)}
			<div className={styles.pagination_container}>
				<Pagination
					type="number"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					disabled={listLoading}
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	);
}

export default ShipmentsHomePage;
