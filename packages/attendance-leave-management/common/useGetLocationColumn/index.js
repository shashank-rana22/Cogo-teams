import { Checkbox, Pill } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const useGetLocationColumn = ({
	handleModal, handleAllSelect, handleSelectId, list = [],
	selectedIds,
}) => {
	const columns = [
		{
			Header: (
				<div className={styles.table_header}>
					<Checkbox
						checked={(list || []).length === selectedIds.length}
						onChange={(e) => handleAllSelect(e)}
					/>
				</div>
			),
			accessor: (item) => (
				<div className={styles.table_header}>
					<Checkbox
						checked={selectedIds.includes(item.employee_id)}
						onChange={(e) => handleSelectId(e, item.employee_id)}
					/>
				</div>
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
			accessor : (item) => <div className={styles.item_data}>{startCase(item.department) || '--'}</div>,
			id       : 'department',
		},
		{
			Header   : <div className={styles.table_header}>REPORTING OFFICE</div>,
			accessor : (item) => <div className={styles.item_data}>{item.reporting_location}</div>,
			id       : 'reporting_location',
		},
		{
			Header   : <div className={styles.table_header}>ACCESS STATUS</div>,
			accessor : (item) => (
				<div className={styles.item_data}>
					<Pill
						key={item.is_active}
						size="md"
						color={item.is_active ? 'green' : 'red'}
					>
						{item.is_active ? 'Active' : 'Inactive'}
					</Pill>
				</div>
			),
			id: 'active',
		},
		{
			Header   : <div className={styles.table_header}>ALLOWED OFFICES</div>,
			accessor : (item) => (
				<div>
					{!isEmpty(item.locations.length) ? item.locations.map((val) => (
						<Pill
							key={val}
							size="md"
							color="green"
						>
							{val || '--'}
						</Pill>
					)) : '--'}
				</div>
			),
			id: 'allowed_offices',
		},
		{
			Header   : <div className={styles.table_header}>ACTION</div>,
			accessor : (item) => (
				<div className={styles.icon_container}>
					<IcMEdit
						className={styles.edit_icon}
						width={18}
						height={18}
						onClick={() => handleModal(item)}
					/>
				</div>
			),
			id: 'action',
		},
	];
	return columns;
};

export default useGetLocationColumn;
