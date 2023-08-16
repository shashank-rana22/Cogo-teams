import { Pagination } from '@cogoport/components';
import { useContext } from 'react';

import KamDeskContext from '../../context/KamDeskContext';

import styles from './styles.module.css';

const PAGE_LIMIT = 10;

function PaginationBar({ data = {} }) {
	const { filters, setFilters } = useContext(KamDeskContext);
	const { page, total_count, page_limit } = data || {};

	const onPageChange = (val) => {
		setFilters({ ...filters, page: val });
	};

	if (total_count > PAGE_LIMIT) {
		return (
			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={onPageChange}
				/>
			</div>
		);
	}
	return null;
}

export default PaginationBar;
