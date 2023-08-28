import { Select, Checkbox } from '@cogoport/components';
// import { IcMEdit } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const useGetLocationColumn = () => {
	const columns = [
		{
			Header   : <Checkbox />,
			accessor : () => (
				<Checkbox />
			),
			id: 'select_all',
		},
		{
			Header   : <div className={styles.table_header}>NAME</div>,
			accessor : (item) => <div className={styles.item_data}>{item.name}</div>,
			id       : 'name',
		},
		{
			Header   : <div className={styles.table_header}>DESIGNATION</div>,
			accessor : (item) => <div className={styles.item_data}>{item.designation}</div>,
			id       : 'designation',
		},
		{
			Header   : <div className={styles.table_header}>DEPARTMENT</div>,
			accessor : (item) => <div className={styles.item_data}>{item.department}</div>,
			id       : 'department',
		},
		{
			Header   : <div className={styles.table_header}>REPORTING OFFICE</div>,
			accessor : (item) => <div className={styles.item_data}>{item.reporting_location}</div>,
			id       : 'reporting_location',
		},
		{
			Header   : <div className={styles.table_header}>ACCESS STATUS</div>,
			accessor : (item) => <div className={styles.item_data}>{item.active}</div>,
			id       : 'active',
		},
		{
			Header   : <div className={styles.table_header}>ALLOWED OFFICES</div>,
			accessor : (item) => (
				<div>
					<Select
						size="sm"
						placeholder={item.allowed_offices}
					/>
				</div>
			),
			id: 'allowed_offices',
		},
	];
	return columns;
};

export default useGetLocationColumn;
