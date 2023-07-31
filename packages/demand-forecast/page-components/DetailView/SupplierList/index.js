import { Pagination } from '@cogoport/components';
import { useState } from 'react';

import getSupplierTableConfig from '../../../configurations/supplier-table-config';
import SupplierDataConfig from '../../../configurations/suppliers-data-config';
import Card from '../Card';

import styles from './styles.module.css';

const DEFAULT_PAGE_SIZE = 0;
const DEFAULT_TOTAL_ITEM = 0;
const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_PAGE = 1;

function SupplierList() {
	const dataList = SupplierDataConfig();
	const [page, setPage] = useState(DEFAULT_PAGE);

	const tableConfig = getSupplierTableConfig();

	return (
		<div className={styles.list}>
			<div className={styles.row}>
				{tableConfig.map((config) => {
					const { key, title, width } = config;
					return <div key={key} style={{ width, textAlign: 'center' }}>{title}</div>;
				})}
			</div>
			{
				dataList.map((card) => (
					<Card key={card?.id} card={card} />
				))
			}
			<div className={styles.pagination_container}>
				<Pagination
					className="md"
					totalItems={dataList?.total_count || DEFAULT_TOTAL_ITEM}
					currentPage={page || DEFAULT_CURRENT_PAGE}
					pageSize={dataList?.page_limit || DEFAULT_PAGE_SIZE}
					onPageChange={setPage}
					type="table"
				/>
			</div>

		</div>
	);
}

export default SupplierList;
