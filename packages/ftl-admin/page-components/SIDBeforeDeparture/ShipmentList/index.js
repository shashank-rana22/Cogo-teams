import { Pagination, Checkbox, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import EmptyState from '../../../common/EmptyState';
import Card from '../Card';
import { SIDBeforeDepartureContext } from '../context';

import styles from './styles.module.css';

export default function ShipmentList({
	data = {}, loading = false, activeTab = '',
	filters = {}, setFilters = () => {},
	setShowModal = () => {},
}) {
	const { list = [], page, total_count, page_limit } = data || {};
	const { selectedShipments, setSelectedShipments } = useContext(SIDBeforeDepartureContext);

	const renderPagination = (
		<div className={styles.pagination_container}>
			<Pagination
				type="table"
				currentPage={page}
				totalItems={total_count}
				pageSize={page_limit}
				onPageChange={(val) => setFilters({ ...filters, page: val })}
			/>
		</div>
	);

	return !loading && isEmpty(list)
		? <EmptyState />
		: (
			<>

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
						<Button
							disabled={!selectedShipments?.size}
							style={{ marginLeft: '1rem' }}
							onClick={() => {
								setShowModal(true);
							}}
						>
							Update Shipment

						</Button>
					</div>
					{renderPagination}
				</div>

				{list?.map((item) => <Card data={item} key={item?.id} activeTab={activeTab} isSelectable />)}
				{renderPagination}
			</>
		);
}
