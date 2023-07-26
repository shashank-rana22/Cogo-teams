import { Checkbox } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const useGetColumns = ({
	bulkEdit, handleAllSelect, handleSelectId, selectedIds,
	dataArr, handleEmployeeId,
}) => {
	const columns = [
		{
			Header   : 'Employee Name',
			accessor : (item) => (
				<div>
					{item?.employee_name}
				</div>
			),
			id: 'employee_name',
		},
		{
			Header   : 'COGO ID',
			accessor : (item) => (
				<div
					className={styles.cogo_id}
					onClick={() => handleEmployeeId(item)}
					aria-hidden
				>
					{item?.cogo_id}
				</div>
			),
			id: 'cogo_id',
		},
		{
			Header   : 'Designation',
			accessor : (item) => (
				<div>
					{item?.designation}
				</div>
			),
			id: 'designation',
		},
		{
			Header   : 'Contact No',
			accessor : (item) => (
				<div>
					{item?.contact_no}
				</div>
			),
			id: 'contact_no',
		},
		{
			Header   : 'Email Id',
			accessor : (item) => (
				<div>
					{item?.email_id}
				</div>
			),
			id: 'email_id',
		},
		{
			Header   : 'Chapter',
			accessor : (item) => (
				<div>
					{item?.chapter}
				</div>
			),
			id: 'chapter',
		},
		{
			Header   : 'Location',
			accessor : (item) => (
				<div>
					{item?.location}
				</div>
			),
			id: 'location',
		},
		{
			Header   : 'Reporting Manager',
			accessor : (item) => (
				<div>
					{item?.reporting_manager}
				</div>
			),
			id: 'reporting_manager',
		},
		{
			Header   : 'Status',
			accessor : (item) => (
				<div>
					{item?.status}
				</div>
			),
			id: 'status',
		},
	];

	const checkBoxColumn = [
		{
			Header: <Checkbox
				checked={dataArr.length === selectedIds.length}
				onChange={(e) => handleAllSelect(e)}
			/>,
			accessor: (item) => (
				<Checkbox
					checked={selectedIds.includes(item.id)}
					onChange={(e) => handleSelectId(e, item.id)}
				/>
			),
			id: 'select_all',
		},
	];

	return bulkEdit ? [...checkBoxColumn, ...columns] : columns;
};

export default useGetColumns;
