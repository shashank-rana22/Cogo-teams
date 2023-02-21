import { Table } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function StyledTable({ columns = [], data = [] }) {
	return (
		<section className={styles.container}>
			<Table columns={columns} data={data} />
		</section>
	);
}

export default StyledTable;
