import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';
import TableComponent from './TableComponent';

function PeopleSalary() {
	const router = useRouter();
	return (
		<div className={styles.main_container}>
			<div className={styles.grey_container}>
				<div className={styles.top_text_container}>
					<span className={styles.top_bold_text}>SALARIES</span>
					<span className={styles.top_grey_text}>View and manage employee salaries</span>
				</div>
				<div className={styles.table_container}>
					<TableComponent router={router} />
				</div>
			</div>
		</div>

	);
}

export default PeopleSalary;
