import { Table } from '@cogoport/components';
import React from 'react';

import useGetBfList from '../../hooks/useGetBfList';

import styles from './styles.module.css';

function FinanceDashBoard() {
	const {
		data = [],
		columns,
		loading,
	} = useGetBfList({ organizationId: '9f148fa6-79a7-4e60-8fab-bc889fc43a13' });

	return (

		<div className={styles.main}>
			<div className={styles.title}>
				Finance Dashboard
			</div>
			<Table data={data} columns={columns} loading={loading} />
		</div>

	);
}

export default FinanceDashBoard;
