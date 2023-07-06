/* eslint-disable no-magic-numbers */
import { Pagination } from '@cogoport/components';
import { useState } from 'react';

import ListSupplier from './ListSupplier';
import Stats from './Stats';
import StatusBar from './StatusBar';
import styles from './styles.module.css';

function Content() {
	const [currentPage, setCurrentPage] = useState(1);
	return (
		<>
			<h2>Governance Manager</h2>
			<Stats />
			<StatusBar />
			<ListSupplier />
			<Pagination
				className={styles.pagination}
				type="number"
				currentPage={currentPage}
				totalItems={1000}
				pageSize={10}
				onPageChange={setCurrentPage}
			/>
		</>
	);
}

export default Content;
