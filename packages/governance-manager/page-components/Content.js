import { Pagination } from '@cogoport/components';
import { useState } from 'react';

import ListSupplier from './ListSupplier';
import Stats from './Stats';
import styles from './styles.module.css';

function Content() {
	const [currentPage, setCurrentPage] = useState(0);
	return (
		<>
			<h2>Governance Mangager</h2>
			<Stats />
			<ListSupplier />
			<Pagination
				className={styles.pagination}
				type="number"
				currentPage={currentPage}
				totalItems={1000}
				pageSize={5}
				onPageChange={setCurrentPage}
			/>
		</>
	);
}

export default Content;
