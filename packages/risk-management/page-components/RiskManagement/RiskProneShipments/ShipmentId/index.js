import { Input, Pagination } from '@cogoport/components';
import { IcMCross, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import LoadingState from '../../common/LoadingState';

import CardList from './CardList';
import SelectFilter from './SelectFilter';
import styles from './styles.module.css';

const ARRAY_LENGTH = 5;

function ShipmentId({
	data = {}, loading = false, filters = '', setFilters = () => {}, activeTab = '',
	getDashboardData = () => {}, getDahboardStatsData = () => {},
}) {
	const { search } = filters || {};
	const { list = [], total_count, page_limit } = data;
	const [searchInput, setSearchInput] = useState(null);
	const suffix = !searchInput ? (
		<div className={styles.icon_wrapper}>
			<IcMSearchlight />
		</div>
	) : (
		<div className={styles.icon_wrapper}>
			<IcMCross
				onClick={() => setSearchInput('')}
				style={{ cursor: 'pointer', color: '#000000' }}
			/>
		</div>
	);
	const handleShipmentView = () => {
		if (loading) {
			return (
				<div style={{ marginTop: '10px' }}>
					{Array(ARRAY_LENGTH).fill().map((item) => (
						<div key={item}>
							<LoadingState />
						</div>
					))}
				</div>
			);
		}
		if (isEmpty(list)) {
			return (
				<div className={styles.no_data}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/noShipmentFound.svg"
						alt="empty_data"
					/>
				</div>
			);
		}
		return list?.map((item) => (
			<CardList
				itemData={item}
				key={item?.serial_id}
				getDashboardData={getDashboardData}
				getDahboardStatsData={getDahboardStatsData}
			/>
		));
	};

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
						onChange={(e) => setFilters({ ...filters, search: e || undefined })}
						suffix={suffix}
					/>
				</div>
			</div>
			<div className={styles.hr} />
			<div>
				<SelectFilter filters={filters} setFilters={setFilters} activeTab={activeTab} />
			</div>
			<div>
				{handleShipmentView()}
			</div>
			{!isEmpty(list) && (
				<div className={styles.pagination}>
					<Pagination
						type="number"
						currentPage={filters.pageIndex}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={(val) => setFilters({ ...filters, pageIndex: val })}
					/>
				</div>
			)}
		</div>
	);
}

export default ShipmentId;
