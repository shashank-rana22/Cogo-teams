import { Input, Pagination } from '@cogoport/components';
import { IcMCross, IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import LoadingState from '../../common/LoadingState';

import CardList from './CardList';
import SelectFilter from './SelectFilter';
import styles from './styles.module.css';

function ShipmentId({ data, loading, filters, setFilters, activeTab }) {
	const { search } = filters || {};
	const { list = [], total_count, page_limit } = data || {};
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
					{[1, 2, 3, 4, 5].map((item) => (
						<div key={item.id}>
							<LoadingState />
						</div>
					))}
				</div>
			);
		}
		if (list.length === 0) {
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
			/>
		));
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.header_text}>
					Shipment ID
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
			{list.length > 0 && (
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
