import { Pagination } from '@cogoport/components';
import { useState } from 'react';

import Card from './Card';
import styles from './styles.module.css';

const DEFAULT_PAGE = 1;

function List() {
	const [page, setPage] = useState(DEFAULT_PAGE);

	return (
		<div className={styles.list}>
			<div className={styles.scroll_view}>
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</div>

			<div className={styles.pagination}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={1000}
					pageSize={10}
					onPageChange={(val) => setPage(val)}
				/>
			</div>
		</div>
	);
}

export default List;
