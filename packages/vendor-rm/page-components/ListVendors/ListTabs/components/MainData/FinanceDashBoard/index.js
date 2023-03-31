import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../../../commons/components/EmptyState';
import useGetBfList from '../hooks/useGetBfList';

import styles from './styles.module.css';

function FinanceDashBoard() {
	const {
		data = [],
		columns,
		loading,
	} = useGetBfList();

	if (isEmpty(data)) {
		return (
			<div style={{ marginLeft: 30 }}>
				<EmptyState />
			</div>
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
