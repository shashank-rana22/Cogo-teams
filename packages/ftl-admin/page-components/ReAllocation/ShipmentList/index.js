import { Button, Checkbox, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import Card from '../Card';

import styles from './styles.module.css';

function ShipmentList({
	data = {},
	selectedShipments = new Set(),
	setSelectedShipments = () => {},
	setFilters = () => {},
	activeTab = '',
}) {
	const { list = [], page, total_count, page_limit } = data || {};

	return (
		<div>
			<div className={styles.list_header}>
				<div className={styles.action_wrapper}>
					<Checkbox
						label="Select All"
						checked={!isEmpty(list) && selectedShipments?.size === list?.length}
						onChange={(e) => {
							if (e?.target?.checked) {
								setSelectedShipments(new Set(list?.map((item) => item?.serial_id)));
							} else setSelectedShipments(new Set());
						}}
					/>
					<Button style={{ marginLeft: '1rem' }}>Update Shipment</Button>
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
		</div>
	);
}

export default ShipmentList;
