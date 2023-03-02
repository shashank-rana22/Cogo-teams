import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useGetBfList from '../hooks/useGetBfList';

import EmptyState from './EmptyState';
import styles from './styles.module.css';

function FinanceDashBoard() {
	const {
		data = [],
		columns,
		loading,
	} = useGetBfList();

	if (isEmpty(data)) {
		return (
			<EmptyState />
		);
	}

	return (
		<div className={styles.main}>

			<div className={styles.title}>
				Finance Dashboard
			</div>

			<Table
				data={data}
				columns={columns}
				loading={loading}
			/>

		</div>

	);
}

export default FinanceDashBoard;
