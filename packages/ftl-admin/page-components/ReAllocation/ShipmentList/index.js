import { Button, Checkbox, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../common/EmptyState';
import Card from '../Card';

import styles from './styles.module.css';

function ShipmentList({
	data = {},
	selectedShipments = new Set(),
	setSelectedShipments = () => {},
	setFilters = () => {},
	activeTab = '',
	loading = false,
	setShowModal = () => {},
}) {
	const { list = [], page = 0, total_count = 0, page_limit = 0 } = data || {};

	return !loading && isEmpty(list) ? <EmptyState /> : (
		<div>
			<div className={styles.list_header}>
				<div className={styles.action_wrapper}>
					<Checkbox
						label="Select All"
						checked={!isEmpty(list) && selectedShipments?.size === list?.length}
						onChange={(e) => {
							if (e?.target?.checked) {
								setSelectedShipments(new Set(list?.map((item) => item?.id)));
							} else setSelectedShipments(new Set());
						}}
					/>
					<Button
						style={{ marginLeft: '1rem' }}
						onClick={() => setShowModal(true)}
						disabled={isEmpty(selectedShipments)}
					>
						Update Shipment

					</Button>
				</div>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={(val) => setFilters((prev) => ({ ...prev, page: val }))}
				/>
			</div>
			{list?.map((listItem) => (
				<Card
					data={listItem}
					key={listItem?.id}
					activeTab={activeTab}
					isSelectable
					selectedShipments={selectedShipments}
					setSelectedShipments={setSelectedShipments}
				/>
			))}
			<div className={styles.pagination_wrapper}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={(val) => setFilters((prev) => ({ ...prev, page: val }))}
				/>
			</div>

		</div>
	);
}

export default ShipmentList;
