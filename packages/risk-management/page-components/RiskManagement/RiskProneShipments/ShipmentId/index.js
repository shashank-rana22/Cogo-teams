import { Input, Pagination } from '@cogoport/components';
import { IcMCross, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import HandleShipmentView from './HandleShipmentView';
import SelectFilter from './SelectFilter';
import styles from './styles.module.css';

function GetIcon({ filters = {}, setFilters = () => {} }) {
	if (isEmpty(filters.search)) {
		return (
			<div className={styles.icon_wrapper}>
				<IcMSearchlight />
			</div>
		);
	}
	return (
		<div className={styles.icon_wrapper}>
			<IcMCross
				onClick={() => setFilters((prev) => ({ ...prev, search: '' }))}
				style={{ cursor: 'pointer', color: '#000000' }}
			/>
		</div>
	);
}

function ShipmentId({
	data = {}, loading = false, filters = '', setFilters = () => {}, activeTab = '',
	getDashboardData = () => {}, getDahboardStatsData = () => {},
}) {
	const { search = '' } = filters || {};
	const { list = [], total_count, page_limit } = data;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.header_text}>
					Shipment ID&apos;s
				</div>
				<div className={styles.search}>
					<Input
						size="sm"
						placeholder="Search By Serial Id"
						value={search}
						onChange={(e) => setFilters((prev) => ({ ...prev, search: e || undefined }))}
						suffix={<GetIcon filters={filters} setFilters={setFilters} />}
					/>
				</div>
			</div>
			<div className={styles.hr} />
			<div>
				<SelectFilter filters={filters} setFilters={setFilters} activeTab={activeTab} />
			</div>
			<div>
				<HandleShipmentView
					loading={loading}
					list={list}
					getDashboardData={getDashboardData}
					getDahboardStatsData={getDahboardStatsData}
				/>
			</div>
			{!isEmpty(list) ? (
				<div className={styles.pagination}>
					<Pagination
						type="number"
						currentPage={filters.pageIndex}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={(val) => setFilters((prev) => ({ ...prev, pageIndex: val }))}
					/>
				</div>
			) : null}
		</div>
	);
}

export default ShipmentId;
