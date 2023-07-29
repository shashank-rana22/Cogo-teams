import { Pagination, Input } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMSearchlight } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useListShipments from '../../../../hooks/useListShipments';

import LoadingState from './LoadingState';
import ShipmentCard from './ShipmentCard';
import styles from './styles.module.css';

const DEFAULT_PAGE = 1;
const PAGE_LIMIT = 6;
const DEFAULT_SHIPMENTS_COUNT = 1;

function ListShipmentCards({
	list = [],
	setActiveTab = () => {},
	showPocDetails = {},
	setShowPocDetails = () => {},
}) {
	if (isEmpty(list)) {
		return (
			<div className={styles.empty_shipments}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.empty_list}
					height={400}
					width={400}
					className={styles.empty_shipments_image}
				/>
			</div>
		);
	}

	return (list || []).map(
		(shipmentItem) => (
			<ShipmentCard
				setActiveTab={setActiveTab}
				key={shipmentItem?.sid}
				shipmentItem={shipmentItem}
				showPocDetails={showPocDetails}
				setShowPocDetails={setShowPocDetails}
			/>
		),
	);
}

function ShipmentsHomePage({ setActiveTab = () => {} }) {
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
						type="number"
					/>
				</div>
			</div>
			<div className={styles.shipments_cards_container}>
				{listLoading
					? <LoadingState />
					: (
						<ListShipmentCards
							list={list}
							setActiveTab={setActiveTab}
							showPocDetails={showPocDetails}
							setShowPocDetails={setShowPocDetails}
						/>
					)}
			</div>

			<div className={styles.pagination_container}>
				{!isEmpty(list) && (
					<Pagination
						type="number"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
						disabled={listLoading}
						onPageChange={handlePageChange}
					/>
				)}
			</div>
		</div>
	);
}

export default ShipmentsHomePage;
