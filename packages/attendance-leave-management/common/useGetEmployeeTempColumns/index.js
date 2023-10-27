import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const useGetLocationColumn = ({
	data = [],
}) => {
	console.log(data, '::');
	const getStatusColor = (status) => {
		switch (status) {
			case 'pending':
				return 'orange';
			case 'approved':
				return 'green';
			case 'rejected':
				return 'red';
			default:
				return 'default';
		}
	};
	const columns = [
		{
			Header   : <div className={styles.table_header}>NAME</div>,
			accessor : (item) => <div className={styles.item_data}>{item?.name}</div>,
			id       : 'name',
		},
		{
			Header   : <div className={styles.table_header}>COGOPORT Email</div>,
			accessor : (item) => <div className={styles.item_data}>{item?.cogoport_email}</div>,
			id       : 'cogoport_email',
		},
		{
			Header   : <div className={styles.table_header}>EMPLOYEE CODE</div>,
			accessor : (item) => <div className={styles.item_data}>{startCase(item?.employee_code) || '--'}</div>,
			id       : 'employee_code',
		},
		// {
		// 	Header   : <div className={styles.table_header}>EMPLOYEE CODE</div>,
		// 	accessor : (item) => <div className={styles.item_data}>{startCase(item?.employee_code) || '--'}</div>,
		// 	id       : 'employee_code',
		// },
		{
			Header   : <div className={styles.table_header}>STATUS</div>,
			accessor : (item) => (
				<div className={styles.item_data}>
					<Pill
						key={item?.status}
						size="md"
						color={getStatusColor(item?.status)}
					>
						{item?.status}
					</Pill>
				</div>
			),
			id: 'active',
		},
	];
	return columns;
};

export default useGetLocationColumn;
