import { Pagination } from '@cogoport/components';
import { useState } from 'react';

import useListShipments from '../../../../hooks/useListShipments';

import LoadingState from './LoadingState';
// import { DUMMY_DATA } from './dummyData'; // need to remove
import ShipmentCard from './ShipmentCard';
import styles from './styles.module.css';

const PAGE_COUNT = 0;
const PAGE_LIMIT = 6;

function ShipmentsHomePage() {
	const [showPocDetails, setShowPocDetails] = useState({});

	const {
		listLoading,
		shipmentsData,
		setPagination = () => {},
	} = useListShipments();

	const { list = [], page, page_limit, total_count } = shipmentsData || {};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.header_title}>
					All Shipments
				</div>
				<div>
					<Pagination
						type="number"
						disabled={listLoading}
						currentPage={page || PAGE_COUNT}
						totalItems={total_count || PAGE_COUNT}
						pageSize={page_limit || PAGE_LIMIT}
						onPageChange={setPagination}
					/>
				</div>
			</div>
			{listLoading ? <LoadingState /> : (
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

		</div>
	);
}

export default ShipmentsHomePage;
