import { Table } from '@cogoport/components';
import React from 'react';

import getServiceColumns from '../../../../../../../configurations/getServiceColumns';

import styles from './styles.module.css';

export default function List({
	data,
}) {
	const TABLE_COLUMNS = getServiceColumns();
	return (
		<div className={styles.table}>
			<Table columns={TABLE_COLUMNS} data={data.lineItems} />
		</div>
	);
}
