import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../../../commons/components/EmptyState';

import styles from './styles.module.css';
import useGetBfList from './useGetBfList';

function FinanceDashBoard() {
	const {
		data = [],
		columns,
		loading,
	} = useGetBfList();

	if (!loading && isEmpty(data)) {
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
