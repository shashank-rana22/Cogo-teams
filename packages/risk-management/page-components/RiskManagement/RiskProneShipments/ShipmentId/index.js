import { Input, Pagination } from '@cogoport/components';
import { IcMCross, IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import CardList from './CardList';
import SelectFilter from './SelectFilter';
import styles from './styles.module.css';

function ShipmentId() {
	const [searchInput, setSearchInput] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const onPageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};
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

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.header_text}>
					Shipment ID
				</div>
				<div className={styles.search}>
					<Input
						size="sm"
						placeholder="Search"
						value={searchInput}
						onChange={(e) => setSearchInput(e)}
						suffix={suffix}
					/>
				</div>
			</div>
			<div className={styles.hr} />
			<div>
				<SelectFilter />
			</div>
			<div>
				{[1, 2, 3, 4, 5].map((item) => (
					<div key={item.id}>
						<CardList />
					</div>
				))}

			</div>
			<div className={styles.pagination}>
				<Pagination
					type="number"
					currentPage={currentPage}
					totalItems={1000}
					pageSize={5}
					onPageChange={onPageChange}
				/>
			</div>
		</div>
	);
}

export default ShipmentId;
