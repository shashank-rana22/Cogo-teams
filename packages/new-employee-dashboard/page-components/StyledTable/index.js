import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function StyledTable({ columns = [], data = [], loading = false }) {
	if (isEmpty(data) && !loading) {
		return (
			<div style={{ paddingTop: 12, paddingLeft: 6 }}>
				No data found
			</div>
		);
	}

	return (
		<section className={styles.container}>
			<Table columns={columns} data={data} loading={loading} />
		</section>
	);
}

export default StyledTable;
