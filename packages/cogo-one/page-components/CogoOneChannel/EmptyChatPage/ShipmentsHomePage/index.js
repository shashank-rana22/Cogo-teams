import { Pagination, Input, Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMSearchlight } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import SHIPMENT_TYPE_OPTIONS from '../../../../constants/shipmentTypes';
import useListShipments from '../../../../hooks/useListShipments';
import { getDefaultFilters } from '../../../../utils/startDateOfMonth';

import Filter from './Filter';
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
	const [range, setRange] = useState('current_month');
	const [dateFilters, setDateFilters] = useState({ ...getDefaultFilters({ range }) });

	const {
		listLoading,
		shipmentsData,
		setParams,
		params,
		handlePageChange = () => {},
	} = useListShipments({ dateFilters });

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
					<Select
						size="sm"
						value={params?.shipmentType}
						className={styles.select_field}
						onChange={(val) => setParams((prev) => ({ ...prev, shipmentType: val }))}
						placeholder="Shipment Type"
						options={SHIPMENT_TYPE_OPTIONS}
						isClearable
					/>
					<div className={styles.custom_date_filter}>
						<Filter
							setDateFilters={setDateFilters}
							range={range}
							setRange={setRange}
						/>
					</div>

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
